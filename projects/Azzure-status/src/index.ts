import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const rootPath = join(process.cwd(), "..", "..");
const projectsPath = join(rootPath, "projects");

type ProjectInfo = {
  name: string;
  hasReadme: boolean;
  hasPackageJson: boolean;
  hasSrc: boolean;
  type: string;
};

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

function detectProjectType(projectPath: string): string {
  if (existsSync(join(projectPath, "package.json"))) return "Node/TS";
  if (existsSync(join(projectPath, "main.py"))) return "Python";
  if (existsSync(join(projectPath, "index.html"))) return "Web";
  return "Docs/Other";
}

function getProjects(): ProjectInfo[] {
  if (!existsSync(projectsPath)) return [];

  return readdirSync(projectsPath)
    .filter((item) => {
      const fullPath = join(projectsPath, item);
      return statSync(fullPath).isDirectory();
    })
    .map((name) => {
      const projectPath = join(projectsPath, name);

      return {
        name,
        type: detectProjectType(projectPath),
        hasReadme: existsSync(join(projectPath, "README.md")),
        hasPackageJson: existsSync(join(projectPath, "package.json")),
        hasSrc: existsSync(join(projectPath, "src")),
      };
    });
}

function yesNo(value: boolean): string {
  return value ? "yes" : "no";
}

function printHeader() {
  console.clear();
  console.log("================================");
  console.log("        AZZURE STATUS");
  console.log("================================\n");
}

function printGitStatus() {
  const branch = run("git branch --show-current") || "unknown";
  const commits = run("git rev-list --count HEAD") || "0";
  const lastCommit = run('git log -1 --pretty=format:"%h - %s"') || "none";
  const status = run("git status --short");

  console.log("Repository");
  console.log(`Branch: ${branch}`);
  console.log(`Commits: ${commits}`);
  console.log(`Last: ${lastCommit}\n`);

  console.log("Changes");
  console.log(status || "Working tree clean.");
  console.log("");
}

function printProjects() {
  const projects = getProjects();

  console.log("Projects");

  if (projects.length === 0) {
    console.log("No projects found.");
    return;
  }

  console.table(
    projects.map((project) => ({
      Project: project.name,
      Type: project.type,
      README: yesNo(project.hasReadme),
      Package: yesNo(project.hasPackageJson),
      Src: yesNo(project.hasSrc),
    }))
  );
}

function main() {
  printHeader();
  printGitStatus();
  printProjects();
  console.log("================================");
}

main();