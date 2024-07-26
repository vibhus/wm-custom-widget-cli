import fs from 'fs';
import path from "path"
import inquirer from 'inquirer';
import chalk from "chalk";
import FormData from 'form-data';
import axios from 'axios';
import ora from 'ora';

const URL = 'http://www.wavemakeronline.com/studio/services/projects/{projectId}/resources/content/project/src/main/webapp/custom-widgets/{widgetName}'

export default function pushToProject(widgetName) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'projectId',
                message: 'Id of the project to which you want to push:'
            },
            {
                type: 'input',
                name: 'cookie',
                message: 'Cookie for the project:'
            }
        ]).then((answers) => {
            const files = getFilesFromDirectory(path.join(process.cwd(), widgetName));
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append(`file${index}`, fs.createReadStream(file));
            });
            const url = replacePlaceholders({ projectId: answers.projectId, widgetName });
            const spinner = ora(`Uplaoding widget ${widgetName} to the project...`).start()
            axios.post(url, formData, {
                headers: {
                    ...formData.getHeaders(),
                    Cookie: `auth_cookie=${answers.cookie}`
                }
            }).then((response) => {
                spinner.succeed(chalk.green(`${widgetName} pushed to the project successfully!`))
            }).catch((error) => {
                spinner.fail(chalk.red(`${widgetName} upload failed: , ${error}`))
            })
        })
}

function replacePlaceholders(replacements) {
    return URL.replace(/{(\w+)}/g, (_, key) => replacements[key] || '');
}

// Function to get all files from a directory
const getFilesFromDirectory = (dir) => {
    return fs.readdirSync(dir).map(file => path.join(dir, file));
};

