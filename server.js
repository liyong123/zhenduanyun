var program = require('commander');
var http = require('http');
var url=require('url');
var fs=require('fs');
var cp = require('child_process');
/*program.option*/
program
  .version('0.0.1')
  .option('-p, --port [port]', 'server port',3088)
  .parse(process.argv);

var mime={
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
var path=require('path');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = decodeURI(pathname); //对路径解码，防止中文乱码
    var realPath = pathname.replace(/^\//,"");

    if(realPath === ""){
        realPath = 'index.html';
    }else if(realPath.match(/.*\/$/)){

        realPath += "index.html";
    }

    var ext = path.extname(realPath); //extname:获取path路径文件扩展名

    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(realPath, function (exists) { //exists :检查文件是否存在
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + realPath + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) { //readFile:异步读取文件
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    try{response.end(err);}catch(ex){}
                } else {
                    var contentType = mime[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");//像客户端返回响应内容
                    response.end();
                }
            });
        }
    });
});
server.listen(program.port, function () {
    console.log(`App is running at :${program.port}`);
    cp.exec(`Explorer http://localhost:${program.port}`, function () {//自动打开浏览器

    });
});
