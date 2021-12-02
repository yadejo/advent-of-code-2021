const fs = require('fs');
const path = require('path');

const day = process.argv[2];

fs.mkdirSync(path.join(__dirname, `day${day}`));

fs.writeFileSync(path.join(__dirname, `day${day}/index.js`), `
    const fs = require("fs");
    const path = require("path");

    const fileContent = fs.readFileSync(path.join(__dirname,'input.txt'));
    const lines = fileContent.toString().split('\r\n');
`);

fs.writeFileSync(path.join(__dirname, `day${day}/input.txt`));