import { config } from "dotenv";
import { env } from "process";
import { defineConfig, Options } from "tsup";

const dev = env.NODE_ENV === "development";
const envNames: string[] = [];

config();
const options: Options = {
	clean: true,
	entry: ["src/index.ts"],
	env: {},
	external: ["tsup"],
	format: "esm",
	minify: true,
	platform: "node",
	replaceNodeEnv: true,
	target: "es2022",
	treeshake: "smallest",
};

for (const name of envNames) if (env[name]) options.env![name] = env[name]!;
if (dev) {
	options.sourcemap = true;
	options.minify = false;
}

export default defineConfig(options);
