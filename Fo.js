//cmd-command line project   // 0      1      2
const fs=require('fs')
const path=require('path')
const help =require('./commands/help')
const organize=require('./commands/organize')
const tree=require('./commands/tree')
let inputArr=process.argv.slice(2)   // node Fo.js abhishek
let command=inputArr[0]

let types = {
        media: ["mp4", "mkv", "mp3","jpg"],
        archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
        documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
        app: ["exe", "dmg", "pkg", "deb"],
};


switch(command){ // tree ,organize ,help

case 'tree': tree.treeKey(inputArr[1]);
                break;

case 'organize':  organize.organizeKey( inputArr[1] );
                break;

case 'help': help.helpKey();
            break;

default:console.log('please enter valid command');
        break;

}




