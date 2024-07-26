#! /usr/bin/env node

import { program } from 'commander'
import createNewBundle from './src/commands/bundle.js'
import createNewWidget from './src/commands/create.js'
import minifyWidget from './src/commands/minify.js'
import pushToProject from './src/commands/push.js'

program
    .command('new <bundleName>')
    .description('Create a new custom widget bundle')
    .action(createNewBundle)


program
   .command('g <type> <widgetName>')
   .description('Create a custom widget with required files')
   .action(createNewWidget)

program 
    .command('minify <widgetName>')
    .description('Minify custom widget files into page.min.json')
    .action(minifyWidget)

program
    .command('push <widgetName>')
    .description('Push the widget into the specified project')
    .action(pushToProject)

program.parse();
