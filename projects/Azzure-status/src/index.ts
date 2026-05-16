import { execSync } from "child_process";

function run(command: string): string {
  try {
    return execSync(command, {
      encoding: "utf-8"
    }).trim();
  } catch {
    return "Não disponível";
  }
}

console.clear();

console.log(`
================================
      AZZURE STATUS
================================
`);

const branch = run("git branch --show-current");

const commits = run(
  "git rev-list --count HEAD"
);

const lastCommit = run(
  'git log -1 --pretty=format:"%h - %s"'
);

const modifiedFiles = run(
  "git status --short"
);

console.log("Branch:");
console.log(branch);

console.log("\nTotal de commits:");
console.log(commits);

console.log("\nÚltimo commit:");
console.log(lastCommit);

console.log("\nArquivos modificados:");

if (
  modifiedFiles === "Não disponível" ||
  modifiedFiles.length === 0
) {
  console.log("Nenhuma alteração.");
} else {
  console.log(modifiedFiles);
}

console.log(`
================================
`);