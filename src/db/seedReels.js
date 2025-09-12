// src/db/seedVideos.js
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

  // Ensure table exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      video_url TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      ingredients TEXT,
      steps TEXT
    )
  `);

  // Load JSON
  const filePath = path.join(process.cwd(), "src", "db", "data", "reels.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const videos = JSON.parse(raw);

  for (const v of videos) {
    await db.run(
      `INSERT OR REPLACE INTO videos 
        (id, title, description, video_url, thumbnail, ingredients, steps) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      v.id,
      v.title,
      v.description,
      v.videoUrl,
      v.thumbnail,
      JSON.stringify(v.ingredients ?? []),
      JSON.stringify(v.steps ?? [])
    );
  }

  console.log(`✅ Seeded ${videos.length} videos`);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
