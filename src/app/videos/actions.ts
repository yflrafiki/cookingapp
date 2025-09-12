"use server";

import { db, videos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getVideos() {
  const rows = await db.select().from(videos);


  return rows.map((row) => ({
    ...row,
    ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
    steps: row.steps ? JSON.parse(row.steps) : [],
  }));
}
