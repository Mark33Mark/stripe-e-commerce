import { defineConfig } from "vite";
// SWC is a faster javascript transformer than Babel
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// Server not needed if using Netlify Dev server
	// server: {
	// 	// open: true,
	// 	port: 5555,
	// },
	build: {
		minify: true,
		chunkSizeWarningLimit: 1500,
	},
	test: {
		css: true,
        // globals:true means you don't need to import vitest API into each test
		globals: true,
		environment: "jsdom",
		setupFiles: "./tests/utilities/setupTests.js",
		coverage: {
			enable: true,
			exclude: [
				"src/main.jsx",
				"src/index.jsx",
				"**/coverage/**",
				"dist/**",
				"**/node_modules/**",
				"**/[.]**",
				"packages/*/test?(s)/**",
				"**/*.d.ts",
				"**/virtual:*",
				"**/__x00__*",
				"**/\x00*",
				"cypress/**",
				"**/test?(s)/**",
				"**/test?(-*).?(c|m)[jt]s?(x)",
				"**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)",
				"**/__tests__/**",
				"**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
				"**/vitest.{workspace,projects}.[jt]s?(on)",
				"**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
			],
			reportsDirectory: "./tests/utilities/coverage",
			reporter: ["text", "json", "html"],
			provider: "v8", // or 'istanbul',
			restoreMocks: true,
		},
	},
});
