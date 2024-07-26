import fs from 'fs';
import path from "path"
import { fileMapKeys } from "../../lib/contentMap.js";

const props = ['markup', 'styles', 'script', 'config', 'variables']
const fileName = "page.min.json"

export default function minifyWidget(widgetName) {
    const minifiedResult = {}

    fileMapKeys.forEach((key, index) => {
        const fileName = key !== 'config.json' ? `${widgetName}.${key}` : key;
        const filePath = path.join(process.cwd(), widgetName, fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const content = fs.readFileSync(filePath, 'utf8')
        minifiedResult[props[index]] = content ? encodeURIComponent(content) : '';
    })

    const fileDestination = path.join(process.cwd(), widgetName, fileName)
    fs.writeFile(fileDestination, JSON.stringify(minifiedResult, undefined, 2), (err) => {
        if (err) {
            console.error(`Error creating ${fileName}:`, err);
            return;
        }

        console.log(`${fileName} created successfully!`);
    });
}