const fs = require("fs");
const os = require("os")
//Sync.. Blocking
// fs.writeFileSync('./test.txt',"Hey There")
// fs.writeFileSync('./test.txt',"Hello World")

//Async non-Blocking
// fs.writeFile('./test.txt',"Hello Parth",(err)=>{console.log(err)})


// fs.readFile('./contancts.txt',"utf-8",(err,result2)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result2)
//     }
// })

// console.log(result)


// fs.appendFileSync('./test.txt',new Date().getDay().toString());

// fs.cpSync('./test.txt','./copied.txt')

// fs.unlinkSync('./copied.txt')
// console.log(fs.statSync('./test.txt'))

// fs.mkdirSync('my-docs/a.txt')
// fs.mkdirSync('my-docs/b.txt')
// fs.mkdirSync('my-docs/c.txt')

// fs.rmdirSync('./my-docs')

// console.log("1");
// const result = fs.readFile('./contancts.txt',"utf-8",(err,result)=>{
//     console.log(result)
// })
// console.log(result)
// console.log("2");

// console.log(os.availableParallelism())

console.log(os.cpus().length);