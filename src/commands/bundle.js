import fs from "fs"
import path from "path"
import chalk from "chalk";

export default function createNewBundle(bundleName) {
    fs.mkdir(path.join(process.cwd(), bundleName), { recursive: true }, (err) => {
        if (err) {
            console.log(chalk.red(`Error creating bundle,${err}`))
        }
    });
    console.log(chalk.green(`WM bundle ${bundleName} created successfully!`));
}
