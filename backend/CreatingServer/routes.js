const fs=require('fs');

const requestHandler=(req,res)=>{

    const url=req.url;
    const method=req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
    
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
    
                res.write('<html>');
    
                res.write('<head><title>Enter Message</title></head>')
    
                res.write('<body><h1></h1><p>' + message + '</p>');
    
                res.write('<form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>')
                res.write('</html>')
                return res.end();
            });
        })
    
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>')
    res.write('<body><h1>Hello from my node.js server!</h1></body>')
    res.write('</html>')
    res.end();
}


// module.exports= {
//     handler:requestHandler,
//     someText: 'some hard coded text'
// };

// module.exports.handler= requestHandler;
// module.exports.someText='some hard coded text';
exports.handler= requestHandler;
exports.someText='some hard coded text';
