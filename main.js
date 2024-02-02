#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { resolveInputSpecUrl, resolveOutputDir } from './utils.js';
import path from 'path';


const getRequiredVariable = (name, configsArray) => {
    const config = configsArray.find(config => config[name]);
    if (config) {
      return config[name];
    } else {
      console.error("Unable to resolve required variable " + name + ". Consider configuring it in .env, config.json or as an environment variable.");
      process.exit(1);
    }
  };

function getGeneratorAndTemplates(projectType) {
    switch (projectType) {
        case 'angular':
            return ['typescript-angular', 'templates/angular'];
        case 'react':
            return ['typescript-fetch', 'templates/react'];
        case 'qa':
            return ['typescript-fetch', 'templates/qa'];
        default:
            throw new Error(`Unknown project type: ${projectType}`);
    }
}

function configure(projectType, configurationsArray) {
    // Get env variables from the project and configure the generator based on the provided project type
    let inputSpec;
    let output;
    let generator;
    let templates;
    let additionalProperties;
    let authToken;
    try {
        inputSpec = resolveInputSpecUrl(getRequiredVariable('INPUT_SPEC', configurationsArray));
        output = resolveOutputDir(getRequiredVariable('OUTPUT', configurationsArray));
        [generator, templates] = getGeneratorAndTemplates(projectType);

        authToken = process.env.AUTH_TOKEN ? encodeURIComponent(process.env.AUTH_TOKEN) : '';

        // Hardcode additional arguments
        additionalProperties = projectType === 'angular' ? 'ngVersion=16.1.5,providedInRoot=true,fileNaming=kebab-case,useSingleRequestParameter=true' : '';
    } catch (error) {
        console.log(error.message);
        return;
    }

    // Change this to use the openapitools.json and introduce multiple generators(angular, react)
    const command = `openapi-generator-cli generate -i ${inputSpec} -o ${output} -g ${generator} -t ${templates} --additional-properties=${additionalProperties} ${authToken ? `--auth Authorization:${authToken}` : ''}`;

    // Calculate the root directory of the plugin in order to execute the 'openapi-generato-cli' command from it,
    // as it is installed only in the plugin as a dependency
    const pluginDir = path.dirname(fileURLToPath(import.meta.url));

    // Execute the openapi-generator-cli command
    execSync(command, { stdio: 'inherit', cwd: pluginDir });
}

export { configure };