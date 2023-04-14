import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { basename, resolve } from "path";
import { parse } from "yaml";
import { version } from "./version.js";

const filesDir = "./overlays";
const filePrefix = "overlay-";
const fileExt = ".yml";

/** @type {Record<string, string[]>} */
const authors = parse(await readFile("./authors.yml", "utf-8"));

async function getLanguageList() {
    const args = process.argv.slice(2);
    if (args.length > 0) {
        return args;
    }

    // Return all available languages
    const files = await readdir(filesDir, { withFileTypes: true });
    return files
        .filter((file) => file.isFile() && file.name.startsWith(filePrefix))
        .map((file) => basename(file.name, fileExt).slice(filePrefix.length));
}

async function getLocalizationData(/** @type {string} */ language) {
    const filePath = resolve(filesDir, `${filePrefix}${language}${fileExt}`);
    const contents = await readFile(filePath, "utf-8");

    const data = parse(contents);
    if (!("metadata" in data)) {
        throw new Error(`Overlay for ${language} is missing metadata section.`);
    }

    // Set version
    data.metadata.version = version;

    // Merge author data
    if (!Array.isArray(authors[language])) {
        throw new Error(`Invalid author list for language ${language}.`);
    }
    data.metadata.author = authors[language].join(", ");

    return data;
}

const generatedDir = resolve("./generated");
await mkdir(generatedDir, { recursive: true });

const loaderContents = await readFile("./scripts/loader.mod.js", "utf-8");
const languages = await getLanguageList();

for (const lang of languages) {
    try {
        const data = await getLocalizationData(lang);
        const l10nLangDef = `const __L10N_LANG__ = ${JSON.stringify(lang)};\n`;
        const l10nDataDef = `const __L10N__ = ${JSON.stringify(data, null, 4)};\n`;

        const outputPath = resolve(generatedDir, `l10n-overlay-${lang}.mod.js`);
        const result = `${l10nLangDef}${l10nDataDef}\n${loaderContents}`;

        await writeFile(outputPath, result, "utf-8");
    } catch (err) {
        console.warn(`Failed to generate localization mod for language ${lang}: ${err}`);
    }
}
