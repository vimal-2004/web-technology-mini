//import require from 'requirejs';
var http=require("http");
function samp(req,res)
{
    if(req.url=="/")
    {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Home</h1>");
    res.write("<h1>welcome to Home page</h1>");
    res.end("<html><body><h1>Home,URL was:"+req.url+"</h1></body></html");
    }
   else if(req.url=="/student")
    {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Student</h1>");
    res.write("<h1>welcome to student page</h1>");
    res.end("<html><body><h1>Home,URL was:"+req.url+"</h1></body></html");
    }
    else if(req.url=="/admin")
        {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>admin</h1>");
        res.write("<h1>welcome to admin page</h1>");
        res.end("<html><body><h1>Home,URL was:"+req.url+"</h1></body></html");
        }
        else{
            res.end("invalid request");
        }
    }
    var server=http.createServer(samp);
    server.listen(3000);
    console.log("server running");
    