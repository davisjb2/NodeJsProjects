const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is Brooke Tibbett.');

//Challenge 1

fs.appendFileSync("notes.txt", " I live in Boone.");