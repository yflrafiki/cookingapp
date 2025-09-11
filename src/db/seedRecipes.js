// src/db/seedRecipes.js
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const fs = require("fs");
const path = require("path");

async function openDb() {
  return open({
    filename: "./sqlite.db",
    driver: sqlite3.Database,
  });
}

async function seed() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT,
      data_ai_hint TEXT,
      ingredients TEXT,
      steps TEXT
    )
  `);

  const filePath = path.join(process.cwd(), "src" , "db" ,  "data", "recipes.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const recipes = JSON.parse(raw);

  for (const r of recipes) {
    await db.run(
      `INSERT OR REPLACE INTO recipes 
        (id, title, description, image, data_ai_hint, ingredients, steps) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      r.id,
      r.title,
      r.description,
      r.image,
      JSON.stringify(r.dataAiHint ?? null),
      JSON.stringify(r.ingredients ?? []),
      JSON.stringify(r.steps ?? [])
    );
  }

  console.log(`✅ Seeded ${recipes.length} recipes`);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
