import fs from "fs"
import path from "path"
import chalk from "chalk";
import contentMap, { fileMapKeys } from "../../lib/contentMap.js";

export default function createNewWidget(type, widgetName) {
    if (type === 'custom') {
        const folderPath = path.join(process.cwd(), widgetName);
        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) {
                console.log(chalk.red(`Error creating widget,${err}`))
            }

        });
        console.log(chalk.green(`WM widget ${widgetName} is created in ${folderPath} with following files!`));


        // Create each file
        fileMapKeys.forEach((extension, index) => {
            const fileName = extension !== 'config.json' ? `${widgetName}.${extension}` : extension;
            const filePath = path.join(folderPath, fileName);
            const content = contentMap.get(extension);

            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error(`Error creating ${fileName}:`, err);
                    return;
                }

                console.log(`${fileName}`);
            });
        });
    }
}

