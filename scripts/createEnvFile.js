const fs = require('fs');
const path = require('path');

const envExamplePath = path.resolve(__dirname, '../.env.example');
const envPath = path.resolve(__dirname, '../.env');

if (!fs.existsSync(envPath)) {
  const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');
  fs.writeFileSync(envPath, envExampleContent);
  console.log('.env file created from .env.example.');
} else {
  console.log('.env file already exists.');
}