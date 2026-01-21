import alchemy from "alchemy";
import { D1Database, Vite, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });
config({ path: "../../apps/server/.env" });

const app = await alchemy("nekogo-temp");

const db = await D1Database("database", {
	migrationsDir: "../../packages/db/src/migrations",
});

// 開発モードかどうかを判定（alchemy dev コマンドで実行時）
const isDev =
	process.env.ALCHEMY_PHASE === "dev" ||
	process.argv.some((arg) => arg.includes("dev"));

export const server = await Worker("server", {
	cwd: "../../apps/server",
	entrypoint: "src/index.ts",
	compatibility: "node",
	bindings: {
		DB: db,
		CORS_ORIGIN: isDev ? "http://localhost:3001" : alchemy.env.CORS_ORIGIN!,
	},
	dev: {
		port: 3000,
	},
});

export const web = await Vite("web", {
	cwd: "../../apps/web",
	assets: "dist",
	bindings: {
		VITE_SERVER_URL: server.url,
	},
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

await app.finalize();
