#!/usr/bin/env node
import 'dotenv/config';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

function getRequiredVariable(name, rootDir) {
    // Try to extract a variable from environment variables
    let value = process.env[name];

    if(!value) {
        try {
            const configPath = path.resolve(rootDir, 'config.json');
            const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            value = config[name];
        } catch(error) {
            // Variable not found in both environment variables or 'config.json' file or failed to read the 'config.json' file
            throw new Error(`Failed to extract variable ${name}\n Reason: ${error.message}`);
        }
    }

    // This 'if' statement is probably redundant, will hit it if variable is an empty string
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }

    return value;
}

function isUrl(string) {
    try {
        new URL(string);
        return true;
    } catch(_) {
        return false;
    }
}

function configure() {
    // Get the root directory of the project
    const rootDir = process.cwd();

    // Get env variables from the project
    let inputSpec;
    let output;
    try {
        inputSpec = getRequiredVariable('INPUT_SPEC', rootDir); 
        output = getRequiredVariable('OUTPUT', rootDir);
    } catch(error) {
        console.log(error.message);
        return;
    }

    // Check if 'INPUT_SPEC' is a URL or file path
    const isInputSpecUrl = isUrl(inputSpec);
    if(!isInputSpecUrl) {
        // If a file path, calculate the '.yml' file's location from project's root directory
        inputSpec = path.resolve(rootDir, inputSpec);
    }

    // Calculate the generation target directory against project's root directory
    output = path.resolve(rootDir, output);

     // Optional, can be undefined
    let authToken = process.env.AUTH_TOKEN;
    if(authToken !== null) {
        // URI encode the token, if present
        authToken = encodeURIComponent(authToken);
    }
    
    // Hardcode additional arguments
    const generator = 'typescript-angular';
    const templates = 'templates/angular';
    const additionalProperties = "ngVersion=16.1.5,providedInRoot=true,fileNaming=kebab-case,useSingleRequestParameter=true";

    // Change this to use the openapitools.json and introduce multiple generators(angular, react)
    const command = `openapi-generator-cli generate 
    -i ${inputSpec} 
    -o ${output} 
    -g ${generator} 
    -t ${templates} 
    --additional-properties ${additionalProperties}
    ${authToken ? `--auth Authorization:${authToken}` : ''}`;

    // Calculate the root directory of the plugin in order to execute the 'openapi-generato-cli' command from it,
    // as it is installed only in the plugin as a dependency
    const pluginDir = path.dirname(fileURLToPath(import.meta.url));

    // Execute the openapi-generator-cli command
    execSync(command, { stdio: 'inherit', cwd: pluginDir });
}

// This is kind of stupid, should be a better way to do it
configure();
