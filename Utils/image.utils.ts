

export function getFilePath(file: any){
    const filePath = file.path;
    
    const fileSplite = filePath.toString().split("/" && "\\");
    
    return `${fileSplite[1]}/${fileSplite[2]}`; 
}

