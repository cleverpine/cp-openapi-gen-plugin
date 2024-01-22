#!/usr/bin/env node
import 'dotenv/config';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

function getRequiredEnvVariable(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
}

function configure() {
    // Get env variables from the parent application
    let inputSpec;
    try {
        inputSpec = getRequiredEnvVariable('INPUT_SPEC'); 
    } catch(error) {
        console.log(error.message);
        return;
    }

     // Optional, can be undefined
    let authToken = process.env.AUTH_TOKEN;
    if(authToken !== null) {
        // URI encode the value, if present
        authToken = encodeURIComponent(authToken);
    }

    // Get the root directory of the parent application that uses the plugin, as we want to generate the models on parent application root level
    // Maybe this can be done better?
    const output = execSync('pwd', { encoding: 'utf8' }).trim() + "/openapi";

    // Hardcode additional arguments
    const generator = 'typescript-angular';
    const templates = 'templates';
    //const additionalProperties = "ngVersion=,providedInRoot=,fileNaming=";

    // Use npx to reference the locally installed openapi-generator-cli
    // Change this to use the openapitools.json and introduce multiple generators(angular, react)
    const command = `npx openapi-generator-cli generate -i ${inputSpec} -o ${output} -g ${generator} -t ${templates} ${authToken ? `--auth Authorization:${authToken}` : ''}`;

    // Calculate the root directory of the plugin in order to execute the 'npx openapi-generato-cli' command, as it is install here as a dependency
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Execute the openapi-generator-cli command
    execSync(command, { stdio: 'inherit', cwd: __dirname });
}

// This is kind of stupid, should be a better way to do it
configure();
