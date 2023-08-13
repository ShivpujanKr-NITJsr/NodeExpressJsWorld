const http =require('http');

const fs= require('fs')
// const server=http.createServer((req,res)=>{
//     // console.log(req.url, req.method,req.headers);
//     // // process.exit();
//     // res.setHeader('Content-Type', 'text/html');
//     // res.write('<html>');

//     // res.write('<head><title>My first Page</title></head>')

//     // res.write('<body><h1>Hello from my node.js server!</h1></body>')
//     // res.write('</html>')
//     // res.end();

//     const url=req.url;
//     if (url === '/home') {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('Welcome home');
//       } else if (url === '/about') {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('Welcome to About Us page');
//       } else if (url === '/node') {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('Welcome to my Node Js project');
//       } else {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('404 - Not Found');
//       }

// });
const server=http.createServer((req,res)=>{
  // console.log(req.url, req.method,req.headers);
  // process.exit();

  const url=req.url;
  const method=req.method;

  if(url ==='/'){
    res.write('<html>');

    res.write('<head><title>Enter Message</title></head>')

    res.write('<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>')
    return res.end();
  }

  if(url==='/message' && method==='POST'){
    const body= [];
    req.on('data',(chunk)=>{
      console.log(chunk)
      body.push(chunk);
    });
    return req.on('end',()=>{
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message =parseBody.split('=')[1];
      // fs.writeFileSync('message.txt',message);
      

      fs.writeFile('message.txt',message, err=>{
        res.statusCode=302;

        // res.setHeader('Location','/')

        res.write('<html>');

        res.write('<head><title>Enter Message</title></head>')

        res.write('<body><h1></h1><p>' + message + '</p>');
        
        res.write('<form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        
    
        return res.end();
      });
      
    })
    
    // res.writeHead(302,{})
    
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');

  res.write('<head><title>My first Page</title></head>')

  res.write('<body><h1>Hello from my node.js server!</h1></body>')
  res.write('</html>')
  res.end();

 
});


server.listen(4000)