import { execFileSync, execSync } from "child_process";
import { readFile } from "fs/promises";

function resolveGitHash() {
    const output = execSync("git rev-parse --short HEAD", {
        encoding: "utf-8",
    });

    return output.trim();
}

const packageContents = await readFile("./package.json", "utf-8");
const gitHash = resolveGitHash();

/** @type {string} */
export const version = `${JSON.parse(packageContents).version}+${gitHash}`;
