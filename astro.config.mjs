import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import auth from "auth-astro";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth(), preact(), db()],
  output: "server",
  adapter: vercel()
});