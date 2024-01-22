# cp-openapi-gen-plugin v0.0.1

`cp-openapi-gen-plugin` is a Node.js package designed for automatic generation of models and APIs from an OpenAPI specification. It leverages the `@openapitools/openapi-generator-cli` to offer a streamlined, command-line interface for generating TypeScript Angular or React code from your OpenAPI documents.

## Features

- **Ease of Integration:** Seamlessly integrates with existing Node.js projects.
- **TypeScript Angular Support:** Generates TypeScript Angular or React code from OpenAPI specifications.
- **Customizable Output:** Allows specifying the input directory of the OpenAPI specification.
- **Model validations**: Generates predefined validations for all models

## Prerequisites
- **npm**
- **Java**

## Installation

```bash
npm install cp-openapi-gen-plugin
```

## Usage

Environment variables
- INPUT_SPEC - **required**
    - the location of the OpenAPI specification. 
    - This can be a URL or a local path file
- AUTH_TOKEN - **optional**
    - Authorization token can be provided via this variable, if 'INPUT_SPEC' is a secured URL address.
    - If the secured URL expects a token prefix, it should be set in the variable, too, etc: 'Bearer mytoken'

Execute the plugin via the npm command:
```bash
npm run cp-openapi-gen
```

