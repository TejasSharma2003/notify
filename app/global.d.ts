import type { Database } from "@/types/supabase";
import { createSelectSchema } from "drizzle-zod";

const articleSchema = createSelectSchema(articles);
