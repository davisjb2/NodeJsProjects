const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

//custom yargs
yargs.version('1.1.0');
//const command = process.argv[2];

// if(command === 'add') {
//     console.log('Adding note!');
// } else if (command === 'remove') {
//     console.log('Removing note!')
// }

//create add
yargs.command({
    command: 'add',
    describe: 'Add a new  note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//Create remove
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//Create read
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readnote(argv.title);
    }
})

//Create list
yargs.command({
    command: 'list',
    describe: 'Lists notes',
    handler() {
        notes.listNotes();
    }
})
//add, remove, read, list


yargs.parse();