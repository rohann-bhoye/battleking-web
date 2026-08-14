// Pulls your current streams from YouTube and updates videos.js.
// Run: node sync-videos.js
//
// - Existing videos keep their "game" and "featured" settings (only their title refreshes).
// - New streams get added automatically with a guessed "game" - check videos.js afterward
//   and fix any that guessed wrong, or add ", featured: true" to pin one to the top row.

const fs = require("fs");
const path = require("path");

const CHANNEL_STREAMS_URL = "https://www.youtube.com/@BattleKingPC/streams";
const VIDEOS_PATH = path.join(__dirname, "videos.js");

const NOISE_TITLES = new Set([
  "Add to queue", "Save to playlist", "Share", "Watch later", "Download",
  "Clip", "Report", "Save", "Not interested", "Don't recommend channel",
  "Remove from Watch later",
]);

function guessGame(title) {
  const parts = title.split("|").map((s) => s.trim());
  if (parts.length >= 2) {
    const g = parts[1]
      .replace(/live\s*stream/i, "")
      .replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, "")
      .trim();
    if (g) return g;
  }
  return "Live Stream";
}

function loadExistingVideos() {
  if (!fs.existsSync(VIDEOS_PATH)) return [];
  const src = fs.readFileSync(VIDEOS_PATH, "utf8");
  const match = src.match(/const VIDEOS = (\[[\s\S]*?\]);/);
  if (!match) return [];
  return new Function(`return ${match[1]};`)();
}

async function fetchStreams() {
  const res = await fetch(CHANNEL_STREAMS_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch channel page: HTTP ${res.status}`);
  const html = await res.text();

  const ids = [];
  const seenIds = new Set();
  const idRe = /"contentId":"([a-zA-Z0-9_-]{11})"/g;
  let m;
  while ((m = idRe.exec(html))) {
    if (!seenIds.has(m[1])) {
      seenIds.add(m[1]);
      ids.push(m[1]);
    }
  }

  const titles = [];
  const tRe = /"title":\{"content":"((?:[^"\\]|\\.)*)"/g;
  while ((m = tRe.exec(html))) {
    let t = m[1];
    try {
      t = JSON.parse(`"${t}"`);
    } catch (e) {
      // leave t as-is if it fails to decode
    }
    if (!NOISE_TITLES.has(t)) titles.push(t);
  }

  return ids.map((id, i) => ({ id, title: titles[i] || "(untitled)" }));
}

function formatVideosFile(videos) {
  const lines = videos.map((v) => {
    const featured = v.featured ? ", featured: true" : "";
    return `  { id: ${JSON.stringify(v.id)}, title: ${JSON.stringify(v.title)}, game: ${JSON.stringify(v.game)}${featured} }`;
  });
  return `// Auto-synced from ${CHANNEL_STREAMS_URL}
// Run "node sync-videos.js" to pull in new streams automatically.
// To feature a video, add ", featured: true" after its game (keep it to a handful).
// To change a game/category, just edit the "game" text - new values get their own filter tab.

const VIDEOS = [
${lines.join(",\n")}
];
`;
}

async function main() {
  console.log(`Fetching current streams from ${CHANNEL_STREAMS_URL} ...`);
  const scraped = await fetchStreams();
  console.log(`Found ${scraped.length} streams on the channel page.`);

  const existing = loadExistingVideos();
  const existingById = new Map(existing.map((v) => [v.id, v]));

  let added = 0;
  const merged = scraped.map(({ id, title }) => {
    const prev = existingById.get(id);
    if (prev) return { ...prev, title };
    added++;
    return { id, title, game: guessGame(title), featured: false };
  });

  fs.writeFileSync(VIDEOS_PATH, formatVideosFile(merged));
  console.log(`Done. ${added} new video(s) added. videos.js now has ${merged.length} total.`);
  if (added > 0) {
    console.log('New videos were auto-tagged with a guessed "game" - check videos.js and fix any that look wrong.');
  }
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
