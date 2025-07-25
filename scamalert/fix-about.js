const fs = require('fs');

// Read the file
let content = fs.readFileSync('./app/about/page.js', 'utf8');

// Fix malformed attributes like: scrambleChars="!@#$%^&*()_+",./-="
content = content.replace(/scrambleChars="[^"]*"[^\s>]+/g, 'scrambleChars="!@#$%^&*()_+"');

// Also handle any remaining problematic patterns
content = content.replace(/scrambleChars="[^"]*"/g, 'scrambleChars="!@#$%^&*()_+"');

// Write the file back
fs.writeFileSync('./app/about/page.js', content);

console.log('Fixed all scrambleChars in about/page.js');
