import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ステージテーブル
export const stages = sqliteTable("stages", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	gridSize: integer("grid_size").notNull(),
	board: text("board").notNull(), // CellData[][] as JSON string
	pickaxeCount: integer("pickaxe_count").notNull().default(3),
	requiredOnigiri: integer("required_onigiri").notNull().default(0),
	createdAt: text("created_at").notNull(),
});

// 記録テーブル
export const stageRecords = sqliteTable("stage_records", {
	id: text("id").primaryKey(),
	stageId: text("stage_id")
		.notNull()
		.references(() => stages.id, { onDelete: "cascade" }),
	playerName: text("player_name").notNull(),
	time: integer("time").notNull(), // milliseconds
	date: text("date").notNull(), // ISO string
});

// Type exports for use in API
export type Stage = typeof stages.$inferSelect;
export type NewStage = typeof stages.$inferInsert;
export type StageRecord = typeof stageRecords.$inferSelect;
export type NewStageRecord = typeof stageRecords.$inferInsert;
