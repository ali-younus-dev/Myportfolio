const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.json':'application/json' };
http.createServer((req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const file = path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403);res.end('Forbidden');return; }
    fs.readFile(file,(error,data) => {
      if(error){res.writeHead(404);res.end('Not found');return;}
      res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
    });
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(4173,'127.0.0.1',()=>console.log('Portfolio 2.0: http://127.0.0.1:4173'));
