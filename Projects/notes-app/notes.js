const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    //debugger
    const notes = loadNotes();
    //const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New Note Added!"));
    } else {
        console.log(chalk.red.inverse("Note Title Taken!"));
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title != title);
    
    if(notesToKeep.length != notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note Removed!"));
    } else {
        console.log(chalk.red.inverse("Note Not Found!"));
    }
    
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.magenta.inverse("Your Notes"));
    notes.forEach((note) => {
        console.log("Title: " + note.title);
        //console.log("Body: " + note.body);
    })
}

const readnote = (title) => {
    const notes = loadNotes();
    const note = notes.find((n) => n.title === title);
    if(note) {
        console.log(chalk.magenta.inverse(title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("Note Note Found!"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes,
    readnote
};