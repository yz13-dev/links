import { writeFile } from "node:fs/promises";
import path from "path";


const fetchMainSchema = async () => {
  try {
    const response = await fetch("https://yz13.link/api/schema")
    const json = await response.text();
    return json
  } catch (error) {
    console.log(error);
  }
}

const fetchFallbackSchema = async () => {
  try {
    const response = await fetch("https://link-yz13.vercel.app/api/schema")
    const json = await response.text();
    return json
  } catch (error) {
    console.log(error);
  }
}

const writeSchema = async (json) => {
  try {
    // write file on root lvl
    const root = path.resolve(__dirname, "../schema.json");

    await writeFile(root, json);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const generateSchema = async () => {
  try {

    // fetch schema from main domain
    const main = await fetchMainSchema();

    if (main) return writeSchema(main)

    // fetch schema from vercel fallback domain
    const fallback = await fetchFallbackSchema();

    if (fallback) return writeSchema(fallback)

    return;

  } catch (error) {
    console.log(error);
  }
}

generateSchema()
