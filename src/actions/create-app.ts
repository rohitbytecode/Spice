import fs from "fs-extra";
import path from "node:path";

export async function generateApp(projectName:string) {
    const target = path.join(process.cwd(), projectName);
    
    await fs.ensureDir(target);

    console.log(`Created ${projectName}`);
}