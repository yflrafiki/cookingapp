
const fs = require("fs");
const path = require("path");
const { db, videos } = require("./schema");

async function seed() {
  try {
    // Load JSON
    const filePath = path.join(process.cwd(), "data", "reels.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    for (const video of data) {
      await db.insert(videos).values({
        id: video.id,
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        thumbnail: video.thumbnail,
        ingredients: JSON.stringify(video.ingredients ?? []),
        steps: JSON.stringify(video.steps ?? []),
      });
    }

    console.log("✅ Seed complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
