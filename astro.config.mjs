// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import cloudProviderFetchAdapter from "@wix/cloud-provider-fetch-adapter";
import react from "@astrojs/react";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";
import postcssPseudoToData from "@wix/postcss-pseudo-to-data";

const wixConfig = JSON.parse(readFileSync(new URL("./wix.config.json", import.meta.url), "utf8"));
const isBuild = process.env.NODE_ENV == "production";
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

if (!process.env.WIX_CLIENT_ID && wixConfig.appId) {
  process.env.WIX_CLIENT_ID = wixConfig.appId;
}

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `import loadFramewire from "framewire.js";
              loadFramewire(true);`
            );
          }

          injectScript(
            "before-hydration",
            `import { setupWixClient } from "/src/lib/wix-client-setup.ts";
            await setupWixClient({ clientId: ${JSON.stringify(wixConfig.appId)} });`
          );
        },
      },
    },
    tailwind(),
    react(isBuild ? {} : {
      babel: { plugins: [sourceAttrsPlugin, dynamicDataPlugin] },
    }),
  ],
  vite: {
    plugins: [customErrorOverlayPlugin()],
    cacheDir: 'node_modules/.cache/.vite',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'zustand',
        'framer-motion',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
        '@radix-ui/*',
        '@wix/sdk',
        '@wix/sdk-runtime/context',
        '@wix/headless-site',
        '@wix/data',
        '@wix/ecom',
        '@wix/image-kit',
        '@wix/members',
        '@wix/redirects',
        '@wix/services-manager-react',
      ],
    },
    css: !isBuild ? {
      postcss: {
        plugins: [
          postcssPseudoToData(),
        ],
      },
    } : undefined,
  },
  ...(isBuild && {
    adapter: isVercel ? vercel() : cloudProviderFetchAdapter({}),
  }),
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["static.wixstatic.com"],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
  security: {
    checkOrigin: false
  }
});
