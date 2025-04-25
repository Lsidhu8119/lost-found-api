import fs from 'fs';
import { generateSwaggerSpec } from '../config/swaggerOptions';

// Generate Swagger spec object
const specs = generateSwaggerSpec();

// Save it to openapi.json at the root folder
fs.writeFileSync('./openapi.json', JSON.stringify(specs, null, 2));

console.log('OpenAPI specification generated successfully!');
