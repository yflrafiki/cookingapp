"use server";

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Recipe } from "@/types";

// Open DB connection
async function openDb() {
  return open({
    filename: "./sqlite.db",
    driver: sqlite3.Database,
  });
}


export async function listAll(query?: string): Promise<Recipe[]> {
  const db = await openDb();

  if (query && query.trim() !== "") {
    return db.all<Recipe[]>(
      "SELECT * FROM recipes WHERE title LIKE ?",
      `%${query}%`
    );
  }


  return db.all<Recipe[]>("SELECT * FROM recipes");
}


export async function getRecipe(id: string): Promise<Recipe | null> {
  const db = await openDb();
  const recipe = await db.get<Recipe>(
    "SELECT * FROM recipes WHERE id = ?",
    id
  );
  return recipe ?? null;
}
