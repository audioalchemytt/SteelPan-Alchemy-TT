import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Parser from "rss-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;
const parser = new Parser();

app.use(cors());
app.use(express.json());

// Keywords to filter
const KEYWORDS = ["steelpan", "pannist", "Caribbean music", "pan", "trinidad", "calypso", "soca"];

const filterContent = (items: any[]) => {
  return items.filter(item => {
    const text = (item.title + " " + (item.contentSnippet || item.content || "")).toLowerCase();
    return KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
  });
};

// API routes
app.get("/api/feeds", async (req, res) => {
  try {
    // 1. Pan Trinbago Feed
    let pantrinbagoItems = [];
    try {
      const feed = await parser.parseURL("https://www.pantrinbago.co.tt/feed");
      pantrinbagoItems = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        summary: item.contentSnippet,
        source: "Pan Trinbago"
      }));
    } catch (e) {
      console.error("Pan Trinbago feed error:", e);
      // Fallback or placeholder if site is down
      pantrinbagoItems = [{ title: "Official Pan Trinbago Updates", link: "https://www.pantrinbago.co.tt/", summary: "Connecting the world through the steelpan.", source: "System" }];
    }

    // 2. Global Pannist Feeds (Mocking some based on known sources or generic musicians)
    // In a real scenario, we'd use specific RSS URLs for Liam Teague, Andy Narell etc.
    const globalPannistSeeds = [
      "https://rss.app/feeds/v1/u5S3Fq7uVzv0F8E3.xml", // Example public feed placeholder
    ];
    
    let globalItems = [];
    // For demo purposes, we'll also include some curated "Global Pannist" items if feeds fail
    globalItems = [
      { id: 1, title: "Liam Teague: The Evolution of the Pan", author: "Liam Teague", link: "#", summary: "Exploring modern techniques in steelpan performance.", source: "Pannist Blog" },
      { id: 2, title: "Andy Narell's New Composition", author: "Andy Narell", link: "#", summary: "A deep dive into jazz fusion with the steelpan.", source: "Jazz Feed" }
    ];

    // 3. Social Handles (Simulated into RSS structure as requested)
    const socialHandles = [
      { platform: "Twitter/X", handle: "@PanTrinbago", link: "https://twitter.com/PanTrinbago", lastPost: "Panorama 2026 dates announced!" },
      { platform: "Instagram", handle: "@OfficialSteelpan", link: "https://instagram.com", lastPost: "Sunset practice sessions 🥁" },
      { platform: "YouTube", handle: "SteelpanWorld", link: "https://youtube.com", lastPost: "How to tune a Tenor Pan - Part 1" }
    ];

    const structuredResponse = {
      pantrinbago_feed: filterContent(pantrinbagoItems),
      global_pannist_feeds: filterContent(globalItems),
      social_handles: socialHandles,
      color_theme: {
        primary: "#1A1A2E",
        secondary: "#16213E",
        accent: "#E94560",
        highlight: "#0F3460"
      }
    };

    res.json(structuredResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feeds" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
