import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";


const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);


export const videos = sqliteTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnail: text("thumbnail").notNull(),
  ingredients: text("ingredients"), 
  steps: text("steps"),             
});


export const recipes = sqliteTable("recipes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  dataAiHint: text("data_ai_hint"), 
  ingredients: text("ingredients"), 
  steps: text("steps"),             
});

