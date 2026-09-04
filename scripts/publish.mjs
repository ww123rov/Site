import { execFileSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const gitDir = join(root, ".git");
const indexFile = join(gitDir, "gh-pages-index");
const branch = "gh-pages";

if (!existsSync(join(dist, "index.html"))) {
  console.error("Нет dist/index.html — сначала npm run build");
  process.exit(1);
}

const git = (...args) =>
  execFileSync("git", args, {
    cwd: dist,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
    env: { ...process.env, GIT_DIR: gitDir, GIT_WORK_TREE: dist, GIT_INDEX_FILE: indexFile },
  }).trim();

const head = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
  cwd: root,
  encoding: "utf8",
}).trim();

writeFileSync(join(dist, ".nojekyll"), "");
writeFileSync(join(dist, ".gitattributes"), "* -text\n");
rmSync(indexFile, { force: true });

git("add", "-A", "-f", ".");
const tree = git("write-tree");

let parent = null;
try {
  parent = git("rev-parse", "--verify", "--quiet", `refs/heads/${branch}`) || null;
} catch {
  parent = null;
}

const message = `Опубликовать сборку ${head}`;
const commit = parent
  ? git("commit-tree", tree, "-p", parent, "-m", message)
  : git("commit-tree", tree, "-m", message);

git("update-ref", `refs/heads/${branch}`, commit);
rmSync(indexFile, { force: true });

git("push", "origin", `${branch}:${branch}`);
console.log(`${branch} -> ${commit.slice(0, 7)} (сборка ${head})`);
