const fs = require('fs')
const chalk = require('chalk')

const addnotes = (title,body) => {
    const notes = loadnotes()
    const duplicatenote = notes.find((note) => note.title===title)
    if(!duplicatenote){
        notes.push({
            title: title,
            body: body
        })
        savenotes(notes)
        console.log(chalk.green.inverse('Note added...'))
    }else{
        console.log(chalk.red.inverse('Title already taken!'))
    }
}

const loadnotes = () => {
    try{
        const jsonbuffer = fs.readFileSync('notes.json')
        const jsonstr = jsonbuffer.toString()
        return JSON.parse(jsonstr)
    }catch(e){
        return []
    }
}

const savenotes = (notes) => {
    const jsondata = JSON.stringify(notes)
    fs.writeFileSync('notes.json',jsondata)
}

const removenotes = (title) => {
    const notes = loadnotes()
    const duplicatenotes = notes.filter((note) => note.title!==title)
    const len = notes.length
    if(duplicatenotes.length===len){
        console.log(chalk.red.inverse('No note found!'))
    }else{
        savenotes(duplicatenotes)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listnotes = () => {
    const notes = loadnotes()
    console.log(chalk.yellow.inverse('Your notes: '))
    notes.forEach(function(note) {
        console.log(chalk.yellow(note.title))
    })
}

const readnote = (title) => {
    const notes = loadnotes()
    const note = notes.find((note) => note.title===title)
    if(note){
        console.log(chalk.yellow.inverse(title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('No such note'))
    }
}

module.exports={
    addnotes: addnotes,
    removenotes: removenotes,
    listnotes: listnotes,
    readnote: readnote
};