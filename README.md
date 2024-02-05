# cp-openapi-gen-plugin v0.0.9

`cp-openapi-gen-plugin` is a Node.js package designed for automatic generation of models and APIs from an OpenAPI specification. It leverages the `@openapitools/openapi-generator-cli` to offer a streamlined, command-line interface for generating TypeScript Angular or React code from your OpenAPI documents.

## Features

- **Ease of Integration:** Seamlessly integrates with existing Node.js projects.
- **TypeScript Support:** Generates TypeScript code from OpenAPI specifications.
- **Customizable Output:** Allows specifying the input directory of the OpenAPI specification.
- **Model validations**: Generates predefined validations for all models.
- **Multiple Generators**: Comes with different generators for Angular, React, and QA code.

## Prerequisites

- **npm**
- **Java**

## Supported Generators
- **cp-openapi-gen-angular**: Generates Angular-specific code from your OpenAPI specifications.
- **cp-openapi-gen-react**: Generates React-specific code suitable for use in React applications.
- **cp-openapi-gen-qa**: Generates QA-specific code for testing or other quality assurance purposes.

## Installation
Run:
```bash
npm install cp-openapi-gen-plugin
```
Add a new 'script' to your 'package.json' file:
```json
{...
  "scripts": {
    "my-custom-script": "cp-openapi-gen-<generator>"
  },
...}
```
**N.B.** Replace the *'generator'* placeholder with your desired generation type. This has to be one of the values from **Supported Generators** section

## Setup

**Required variables**
- INPUT_SPEC
    - The location of the OpenAPI specification. 
    - This can be a URL or a local path file(absolute or relative path).
    - Can be defined in '.env' file:
        ``` env
        INPUT_SPEC = my_specification_location
        ```
        or 'config.json' file:
        ```json
        {...
            "INPUT_SPEC": "my_specification_location"
        ...}
        ```
- OUTPUT
  - Target directory for model & APIs generation
  - Gets resolved against project's root level
  - If such directory does not exist, it will be automatically created
  - Can be defined in '.env' file:
      ``` env
      OUTPUT = my_generation_target_directory
      ```
      or 'config.json' file:
      ```json
      {...
          "OUTPUT": "my_generation_target_directory"
      ...}
      ```


**Optional variables**
- AUTH_TOKEN
    - Authorization token can be provided through this variable, if 'INPUT_SPEC' is a secured URL address.
    - If the secured URL expects a token prefix, it should be set in the variable, too, etc: 'Bearer mytoken'
    - Can only be defined in '.env' file:
        ```env
        AUTH_TOKEN = Bearer mytoken
        ```

## Usage

Run the plugin via the npm command:
```bash
npm run my-custom-script
```