const fs=require('fs')
const path=require('path')
let types = {

    media: ["mp4", "mkv", "mp3","jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],
    
};


function organizefn( dirPath ){
    let destPath;
    if(dirPath==undefined){
            console.log('please enter a valid path');
            return;
    }
    else{
            let  doesExit=fs.existsSync(dirPath);
            

            if(doesExit==true){
                    destPath= path.join(dirPath,'orginzed_files');
                    if(fs.existsSync(destPath)==false){
                            fs.mkdirSync(destPath);
                    }
                    else{
                            console.log('file already exits');
                    }

            }
            else{
                    console.log('please enter a valid path');
            }


    }
   organizerhelper(dirPath,destPath);

}

function organizerhelper(src,dest){
    let childNames=fs.readdirSync(src)//get all files nd folder

    for(let i=0;i<childNames.length;i++){
            
            let childAdress=path.join(src , childNames[i]);
            let isFile=fs.lstatSync(childAdress).isFile();
            //console.log(childerAdress + " " + isFile)
            if(isFile==true){
                    let filecategory=getCategory(childNames[i]); 
                    console.log(childNames[i]+ " --->  " +filecategory);
                    sendFiles(childAdress,dest,filecategory)
            }


    }
}

function getCategory(name){
    let ext =path.extname(name);
    ext=ext.slice(1); //taking out . from extension
    //console.log(ext);

    for(let type in types){
            let cTypeArr=types[type];
            for(let i=0;i<cTypeArr.length;i++){
                    if(ext== cTypeArr[i])
                    return type;
            }
    }
    return 'others'
    
}
function sendFiles(srcfile,dest,fileCategory){
    let catPath=path.join(dest,fileCategory);
    if(fs.existsSync(catPath)== false){
            fs.mkdirSync(catPath);
    }
    let fileName=path.basename(srcfile);//we took out name of the files
    let destfilepath=path.join(catPath,fileName)//here we created path for file in a cateory folder

    fs.copyFileSync(srcfile,destfilepath)//copy files from src to destion
    fs.unlinkSync(srcfile) //del file from src
    console.log(fileName + "--->" +fileCategory)
       
}


module.exports={
    organizeKey:organizefn
}