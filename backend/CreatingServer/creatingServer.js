const http =require('http');


const server=http.createServer((req,res)=>{
    console.log("shivpujan",req);
});

server.listen(4000)