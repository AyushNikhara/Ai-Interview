import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/schema.js",
    dbCredentials: {
        url: 'postgresql://Mockinterviewdb_owner:xXrCH7aGgo2P@ep-proud-fire-a5h4c0d7.us-east-2.aws.neon.tech/Mockinterviewdb?sslmode=require',
    },
});
