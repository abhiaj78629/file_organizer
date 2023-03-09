const fs=require('fs')
const path=require('path')


function treefn(dirpath){
    if(dirpath==undefined){
            console.log("please enter a valid path");
    }
    else
    {
            let doesExit=fs.existsSync(dirpath);
            if(doesExit==true){
            treeHelper(dirpath," ");
            }
    }
}
function treeHelper(targetPath ,indent){
    let isFile=fs.lstatSync(targetPath).isFile();
if(isFile==true){
    let fileName=path.basename(targetPath);
    console.log(indent + "├──" +fileName);
}
else{
    let dirName=path.basename(targetPath);
    console.log(indent + "└──" +dirName);
    let childern=fs.readdirSync(targetPath);//took all the childer  of test folder

    for(let i=0;i<childern.length;i++){
            let childPath=path.join(targetPath,childern[i])
           // console.log(childPath)

            treeHelper(childPath,indent +'\t');

    }
}
}
module.exports={
    treeKey:treefn
}