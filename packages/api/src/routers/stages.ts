import { db } from "@nekogo-temp/db";
import { stageRecords, stages } from "@nekogo-temp/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure } from "../index";

// Zod schemas
const wallsSchema = z.object({
	top: z.boolean(),
	right: z.boolean(),
	bottom: z.boolean(),
	left: z.boolean(),
});

const cellDataSchema = z.object({
	element: z.string(),
	direction: z.enum(["up", "right", "down", "left"]),
	walls: wallsSchema,
	teleportId: z.number().optional(),
	mouseId: z.number().optional(),
	mousePath: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
});

const createStageSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(50),
	gridSize: z.number().min(4).max(8),
	board: z.array(z.array(cellDataSchema)),
	pickaxeCount: z.number().min(0).max(10),
	mouseTrapCount: z.number().min(0).max(10),
	requiredOnigiri: z.number().min(0),
	createdAt: z.string(),
	records: z.array(z.any()).optional(), // フロントエンドから送られてくるが無視
});

const recordSchema = z.object({
	name: z.string(),
	time: z.number(),
	date: z.string(),
});

const addRecordSchema = z.object({
	stageId: z.string(),
	playerName: z.string().min(1).max(20),
	time: z.number(),
	date: z.string(),
});

const stageWithRecordsSchema = createStageSchema.extend({
	records: z.array(recordSchema).default([]),
});

export const stagesRouter = {
	// 全ステージ取得（記録付き）
	list: publicProcedure.handler(async () => {
		const allStages = await db.select().from(stages);
		const allRecords = await db
			.select()
			.from(stageRecords)
			.orderBy(stageRecords.time);

		return allStages.map((stage) => ({
			...stage,
			board: JSON.parse(stage.board),
			records: allRecords
				.filter((r) => r.stageId === stage.id)
				.slice(0, 10)
				.map((r) => ({ name: r.playerName, time: r.time, date: r.date })),
		}));
	}),

	// 単一ステージ取得
	get: publicProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			const [stage] = await db
				.select()
				.from(stages)
				.where(eq(stages.id, input.id));
			if (!stage) return null;

			const records = await db
				.select()
				.from(stageRecords)
				.where(eq(stageRecords.stageId, input.id))
				.orderBy(stageRecords.time)
				.limit(10);

			return {
				...stage,
				board: JSON.parse(stage.board),
				records: records.map((r) => ({
					name: r.playerName,
					time: r.time,
					date: r.date,
				})),
			};
		}),

	// ステージ作成
	create: publicProcedure
		.input(createStageSchema)
		.handler(async ({ input }) => {
			await db.insert(stages).values({
				id: input.id,
				name: input.name,
				gridSize: input.gridSize,
				board: JSON.stringify(input.board),
				pickaxeCount: input.pickaxeCount,
				mouseTrapCount: input.mouseTrapCount,
				requiredOnigiri: input.requiredOnigiri,
				createdAt: input.createdAt,
			});
			return { success: true, id: input.id };
		}),

	// 記録追加
	addRecord: publicProcedure
		.input(addRecordSchema)
		.handler(async ({ input }) => {
			const recordId = `${input.stageId}-${Date.now()}`;
			await db.insert(stageRecords).values({
				id: recordId,
				stageId: input.stageId,
				playerName: input.playerName,
				time: input.time,
				date: input.date,
			});
			return { success: true };
		}),

	// ステージ削除
	delete: publicProcedure
		.input(z.object({ id: z.string() }))
		.handler(async ({ input }) => {
			await db.delete(stages).where(eq(stages.id, input.id));
			return { success: true };
		}),

	// 一括インポート（localStorage移行用）
	bulkImport: publicProcedure
		.input(z.array(stageWithRecordsSchema))
		.handler(async ({ input }) => {
			for (const stage of input) {
				// Check if stage already exists
				const [existing] = await db
					.select()
					.from(stages)
					.where(eq(stages.id, stage.id));
				if (existing) continue;

				// Insert stage
				await db.insert(stages).values({
					id: stage.id,
					name: stage.name,
					gridSize: stage.gridSize,
					board: JSON.stringify(stage.board),
					pickaxeCount: stage.pickaxeCount,
					mouseTrapCount: stage.mouseTrapCount ?? 0,
					requiredOnigiri: stage.requiredOnigiri,
					createdAt: stage.createdAt,
				});

				// Insert records
				for (const record of stage.records) {
					await db.insert(stageRecords).values({
						id: `${stage.id}-${record.date}`,
						stageId: stage.id,
						playerName: record.name,
						time: record.time,
						date: record.date,
					});
				}
			}
			return { success: true, count: input.length };
		}),
};
