import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repository = "HoraceLuBFA/en-zh-translation-polish";
const generator = fileURLToPath(new URL("./update-star-history.mjs", import.meta.url));
const stars = (count) => Array.from({ length: count }, () => ({
  starred_at: "2026-09-01T12:00:00Z",
}));

async function generate(reportedCount, pages, status = 200) {
  const directory = await mkdtemp(join(tmpdir(), "star-history-test-"));
  const output = join(directory, "assets", "star-history.svg");
  const responses = [
    { created_at: "2026-06-13T15:19:16Z", stargazers_count: reportedCount },
    ...pages,
  ];
  const paths = [
    `/repos/${repository}`,
    ...pages.map((_, index) => `/repos/${repository}/stargazers?per_page=100&page=${index + 1}`),
  ];
  // Inject HTTP fixtures into a separate process to exercise the actual CLI,
  // pagination, failure exits, and file output without using credentials.
  const preload = `
    const responses = ${JSON.stringify(responses)};
    const paths = ${JSON.stringify(paths)};
    globalThis.fetch = async (url, options) => {
      if (url !== "https://api.github.com" + paths.shift()) throw new Error("Unexpected API request: " + url);
      if (options.headers.Accept !== "application/vnd.github.star+json") throw new Error("Missing timestamp media type");
      return new Response(JSON.stringify(responses.shift()), { status: ${status} });
    };
    process.on("exit", (code) => {
      if (code === 0 && paths.length) process.exitCode = 1;
    });
  `;
  try {
    const result = spawnSync(process.execPath, [
      "--import", `data:text/javascript,${encodeURIComponent(preload)}`, generator,
    ], {
      encoding: "utf8",
      env: { ...process.env, GITHUB_REPOSITORY: repository, GITHUB_TOKEN: "test-token", STAR_HISTORY_OUTPUT: output },
      timeout: 10_000,
    });
    if (result.error) throw result.error;
    const svg = await readFile(output, "utf8").catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    return { ...result, svg };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("113 reported stars and 112 timestamps generate an accurately labelled chart", async () => {
  const result = await generate(113, [stars(100), stars(12)]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /::warning::GitHub reports 113 total stars/);
  assert.match(result.svg, /112 timestamped; GitHub total: 113/);
  assert.match(result.svg, />112 stars<\/text>/);
});

test("more timestamps than reported stars also generate a disclosed chart", async () => {
  const result = await generate(1, [stars(2)]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.svg, /2 timestamped; GitHub total: 1/);
});

test("matching counts across pages generate a chart without a warning", async () => {
  const result = await generate(101, [stars(100), stars(1)]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.match(result.svg, />101 stars<\/text>/);
});

test("an exactly full page fetches the next empty page", async () => {
  const result = await generate(100, [stars(100), []]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.svg, />100 stars<\/text>/);
});

test("a repository with no stars generates a finite zero-star chart", async () => {
  const result = await generate(0, [[]]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.svg, />0 stars<\/text>/);
  assert.doesNotMatch(result.svg, /NaN|Infinity/);
});

for (const starred_at of [undefined, "invalid-date"]) {
  test(`a ${starred_at === undefined ? "missing" : "malformed"} timestamp fails without writing a chart`, async () => {
    const result = await generate(1, [[{ starred_at }]]);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /missing or invalid starred_at timestamp/);
    assert.equal(result.svg, null);
  });
}

test("API authentication failures still fail without writing a chart", async () => {
  const result = await generate(1, [], 401);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /GitHub API 401/);
  assert.equal(result.svg, null);
});
