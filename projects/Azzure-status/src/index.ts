import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const rootPath = join(process.cwd(), "..", "..");

function run(command: string, cwd: string = rootPath): string {
  try {
    return execSync(command, {
      cwd,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function getProjectFolders(): string[] {
  const projectsPath = join(rootPath, "projects");

  if (!existsSync(projectsPath)) {
    return [];
  }

  return readdirSync(projectsPath).filter((item) => {
    const fullPath = join(projectsPath, item);
    return statSync(fullPath).isDirectory();
  });
}

function printHeader() {
  console.clear();

  console.log("================================");
  console.log("        AZZURE STATUS");
  console.log("================================");
  console.log("");
}

function printGitStatus() {
  const branch = run("git branch --show-current") || "unknown";
  const commits = run("git rev-list --count HEAD") || "0";
  const lastCommit = run('git log -1 --pretty=format:"%h - %s"') || "none";
  const status = run("git status --short");

  console.log("Repository");
  console.log(`Branch: ${branch}`);
  console.log(`Commits: ${commits}`);
  console.log(`Last: ${lastCommit}`);
  console.log("");

  console.log("Changes");

  if (!status) {
    console.log("Working tree clean.");
  } else {
    console.log(status);
  }

  console.log("");
}

function printProjects() {
  const folders = getProjectFolders();

  console.log("Projects");

  if (folders.length === 0) {
    console.log("No projects found.");
    return;
  }

  for (const folder of folders) {
    console.log(`- ${folder}`);
  }

  console.log("");
}

function main() {
  printHeader();
  printGitStatus();
  printProjects();

  console.log("================================");
}

main();