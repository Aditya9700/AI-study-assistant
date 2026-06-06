import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const isVercel = !!process.env.VERCEL;

export default defineConfig(async ({ command }) => {
  const plugins: any[] = [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // On Vercel, use the default server entry (not the Cloudflare Workers one)
      ...(isVercel ? {} : { server: { entry: "server" } }),
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    viteReact(),
  ];

  // Only load Cloudflare plugin for non-Vercel production builds
  if (command === "build" && !isVercel) {
    try {
      const { cloudflare } = await import("@cloudflare/vite-plugin");
      plugins.push(cloudflare({ viteEnvironment: { name: "ssr" } }));
    } catch {
      // Cloudflare plugin not available, skip it
    }
  }

  return {
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
  };
});
