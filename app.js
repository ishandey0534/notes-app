const chalk = require('chalk');
const yargs = require('yargs');
const noteutils = require('./notes.js');



yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv){
        noteutils.addnotes(argv.title,argv.body);
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv){
        noteutils.removenotes(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler(){
        noteutils.listnotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'Read note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        noteutils.readnote(argv.title)
    }
})

yargs.parse();