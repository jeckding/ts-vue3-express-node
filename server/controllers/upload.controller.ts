import { Request, Response } from "express";
const Busboy = require('busboy')
const fs = require("fs")
const path = require("path")

export const upload = (req: Request, res: Response) => {
  res.statusCode = 200
  
  const busboy = Busboy({ headers: req.headers, 'Content-Type': 'text/html;'});
  busboy.on('file', (fieldname: string, file: any, info: any) => {
  	console.log( fieldname, file, info)
  	console.log(11111111111111111111111111111, decodeURIComponent(info.filename))
  	
  	const saveTo = path.join(__dirname, 'uploads', info.filename);
  	file.pipe(fs.createWriteStream(saveTo));
  	file.on('data', function (data: any ) {
  		//监听data事件，接受传递来的文件，如果文件过大，此事件会被执行多次
  		console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
  	});
  });
  busboy.on('finish', () => {
  	res.send({
  		code: 0,
  		msg: "文件上传成功"
  	});
  });
  return req.pipe(busboy);
};
