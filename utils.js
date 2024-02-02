import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();
export const rootDir = process.cwd();


export const loadDefaultEnv = () => {
    return { ...process.env };
}

/**
 * Loads the environment variables for a specific environment, specified in the '.env' file.
 * @returns {Object} The environment variables object.
 */
export const loadMultistageDotEnv = () => {
    const envName = process.env.env || 'default';
    const envFile = `.env.${envName}`;
    const envFileDefault = '.env.default';

    // check if envFile exist, else default to .env.default
    if (!fs.existsSync(envFile)) {
        console.warn(`Environment file '${envFile}' not found. Defaulting to '.env.default'`);
        dotenv.config({ path: envFileDefault });
    }else{
        dotenv.config({ path: envFile });
    }
    

    return { ...process.env };
}

/**
 * Loads configuration from a config.json file.
 * If the file is empty, non-existent, or in the wrong format, returns an empty object.
 * 
 * @returns {Object} The configuration object.
 */

export const loadConfigJson = () => {
    const configPath = path.resolve(rootDir, 'config.json');
    try {
        const fileContents = fs.readFileSync(configPath, 'utf8');
        // Check if the file is empty
        if (!fileContents) return {};
        return JSON.parse(fileContents);
    } catch (error) {
        // In case of any error (file not found, parsing error), return an empty object
        return {};
    }
}

export const resolveInputSpecUrl = (inputSpecUrl) => {
    try {
        new URL(inputSpecUrl);
        return inputSpecUrl;
    } catch {
        return path.resolve(rootDir, inputSpec);
    }
}

export const resolveOutputDir = (outputDir) => {
    return path.resolve(rootDir, outputDir);
}