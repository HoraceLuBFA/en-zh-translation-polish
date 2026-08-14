#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const repository = process.env.GITHUB_REPOSITORY || process.argv[2];
const token = process.env.GITHUB_TOKEN;
const outputPath = process.env.STAR_HISTORY_OUTPUT || "assets/star-history.svg";

if (!repository || !repository.includes("/")) {
  throw new Error("Set GITHUB_REPOSITORY to owner/repository or pass it as the first argument.");
}

if (!token) {
  throw new Error("Set GITHUB_TOKEN to a token that can read this repository's metadata.");
}

const headers = {
  Accept: "application/vnd.github.star+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2026-03-10",
  "User-Agent": "repository-star-history-generator",
};

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) {
    const message = (await response.text()).slice(0, 500);
    throw new Error(`GitHub API ${response.status} for ${path}: ${message}`);
  }
  return response.json();
}

async function listStargazers() {
  const items = [];
  for (let page = 1; ; page += 1) {
    const batch = await github(
      `/repos/${repository}/stargazers?per_page=100&page=${page}`,
    );
    items.push(...batch);
    if (batch.length < 100) break;
  }
  return items;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function niceStep(value) {
  if (value <= 1) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

function formatDate(milliseconds) {
  return new Date(milliseconds).toISOString().slice(0, 10);
}

function renderSvg(repo, createdAt, starredAt) {
  const width = 900;
  const height = 520;
  const margin = { top: 76, right: 34, bottom: 66, left: 76 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const day = 86_400_000;

  const timestamps = starredAt
    .map((value) => Date.parse(value))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  const dailyCounts = new Map();
  for (const timestamp of timestamps) {
    const date = formatDate(timestamp);
    dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
  }

  let cumulative = 0;
  const daily = [...dailyCounts].map(([date, count]) => {
    cumulative += count;
    return { timestamp: Date.parse(`${date}T12:00:00Z`), count: cumulative };
  });

  const createdTimestamp = Date.parse(createdAt);
  const firstTimestamp = daily[0]?.timestamp ?? createdTimestamp;
  const lastTimestamp = daily.at(-1)?.timestamp ?? createdTimestamp + day;
  const start = Math.min(createdTimestamp, firstTimestamp);
  const end = Math.max(lastTimestamp, start + day);
  const starCount = timestamps.length;
  const yStep = niceStep(Math.max(starCount, 1) / 5);
  const yMax = Math.max(yStep, Math.ceil(Math.max(starCount, 1) / yStep) * yStep);

  const x = (timestamp) =>
    margin.left + ((timestamp - start) / (end - start)) * plotWidth;
  const y = (count) =>
    margin.top + plotHeight - (count / yMax) * plotHeight;

  const line = [`M ${x(start).toFixed(2)} ${y(0).toFixed(2)}`];
  let previousCount = 0;
  for (const point of daily) {
    line.push(`L ${x(point.timestamp).toFixed(2)} ${y(previousCount).toFixed(2)}`);
    line.push(`L ${x(point.timestamp).toFixed(2)} ${y(point.count).toFixed(2)}`);
    previousCount = point.count;
  }
  line.push(`L ${x(end).toFixed(2)} ${y(previousCount).toFixed(2)}`);

  const area = [
    ...line,
    `L ${x(end).toFixed(2)} ${y(0).toFixed(2)}`,
    `L ${x(start).toFixed(2)} ${y(0).toFixed(2)}`,
    "Z",
  ];

  const yGrid = [];
  for (let value = 0; value <= yMax; value += yStep) {
    const position = y(value).toFixed(2);
    yGrid.push(
      `<line class="grid" x1="${margin.left}" y1="${position}" x2="${width - margin.right}" y2="${position}" />`,
      `<text class="axis-label" x="${margin.left - 12}" y="${Number(position) + 5}" text-anchor="end">${value}</text>`,
    );
  }

  const xTicks = [];
  for (let index = 0; index <= 4; index += 1) {
    const timestamp = start + ((end - start) * index) / 4;
    const position = x(timestamp).toFixed(2);
    xTicks.push(
      `<line class="grid" x1="${position}" y1="${margin.top}" x2="${position}" y2="${margin.top + plotHeight}" />`,
      `<text class="axis-label" x="${position}" y="${height - margin.bottom + 28}" text-anchor="middle">${formatDate(timestamp)}</text>`,
    );
  }

  const safeRepo = escapeXml(repo);
  const dateRange = `${formatDate(start)} to ${formatDate(end)}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">Star history for ${safeRepo}</title>
  <desc id="description">${starCount} stars from ${dateRange}</desc>
  <style>
    :root { color-scheme: light dark; }
    .background { fill: #ffffff; }
    .grid { stroke: #d8dee4; stroke-width: 1; }
    .axis-label { fill: #57606a; font: 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .title { fill: #1f2328; font: 600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .subtitle { fill: #57606a; font: 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .area { fill: #0969da; opacity: 0.14; }
    .line { fill: none; stroke: #0969da; stroke-width: 3; stroke-linejoin: round; }
    .endpoint { fill: #0969da; }
    .count { fill: #1f2328; font: 600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    @media (prefers-color-scheme: dark) {
      .background { fill: #0d1117; }
      .grid { stroke: #30363d; }
      .axis-label, .subtitle { fill: #8b949e; }
      .title, .count { fill: #f0f6fc; }
      .area { fill: #58a6ff; opacity: 0.18; }
      .line { stroke: #58a6ff; }
      .endpoint { fill: #58a6ff; }
    }
  </style>
  <rect class="background" width="${width}" height="${height}" rx="10" />
  <text class="title" x="${margin.left}" y="34">Star History</text>
  <text class="subtitle" x="${margin.left}" y="58">${safeRepo}</text>
  ${yGrid.join("\n  ")}
  ${xTicks.join("\n  ")}
  <path class="area" d="${area.join(" ")}" />
  <path class="line" d="${line.join(" ")}" />
  <circle class="endpoint" cx="${x(end).toFixed(2)}" cy="${y(starCount).toFixed(2)}" r="5" />
  <text class="count" x="${x(end).toFixed(2)}" y="${(y(starCount) - 12).toFixed(2)}" text-anchor="end">${starCount} stars</text>
</svg>
`;
}

const repositoryData = await github(`/repos/${repository}`);
const stargazers = await listStargazers();
const starredAt = stargazers.map((item) => item.starred_at).filter(Boolean);

if (starredAt.length !== repositoryData.stargazers_count) {
  throw new Error(
    `Expected ${repositoryData.stargazers_count} timestamped stars, received ${starredAt.length}.`,
  );
}

const svg = renderSvg(repository, repositoryData.created_at, starredAt);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, svg, "utf8");
console.log(`Generated ${outputPath} with ${starredAt.length} stars.`);
