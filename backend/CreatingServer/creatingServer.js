const http =require('http');


const server=http.createServer((req,res)=>{
    // console.log(req.url, req.method,req.headers);
    // // process.exit();
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');

    // res.write('<head><title>My first Page</title></head>')

    // res.write('<body><h1>Hello from my node.js server!</h1></body>')
    // res.write('</html>')
    // res.end();

    const url=req.url;
    if (url === '/home') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome home');
      } else if (url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to About Us page');
      } else if (url === '/node') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to my Node Js project');
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 - Not Found');
      }

});

server.listen(4000)