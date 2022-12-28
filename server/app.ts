var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { cors: true });
// const express = require('express')
const Busboy = require('busboy')
const fs = require("fs")
const path = require("path")
const readFile = require("./controllers/readFile.controller")
const home = require("./controllers/home.controller")

app.get("/", (req: any, res: any) => {
	console.log(readFile.readFileList("./server/uploads/", []))
	res.send(readFile.readFileList("./server/uploads/", []))
})
app.all("*", (req: any, res: any, next: any) => {
	console.log(req.header.origin)
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Credentials", true); // ++ 新增
	res.header("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");
	res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Content-Type, Authorization')
	next();
});

let userCount = 0

const SUCCESS = 100;
const ERROR = 101;

const ENTER = 0
const LEAVE = 1
const MESSAGE = 2

io.on('connection', (socket: any) => {
	console.log('a user connected');

	userCount++;
	socket.on('post message', (data: any) => {
		console.log(data, "用户" + userCount)
	})
	socket.emit('hello', 'hello')
});

// app.all('/add_list', (req: any, res: any) => {
// 	console.log("all接口")
// 	res.statusCode = 200
// 	res.send({ name: 'name' })
// })


app.post("/upload_file", (req: any, res: any) => {
	res.statusCode = 200
	const busboy = Busboy({ headers: req.headers, 'Content-Type': 'text/plain;charset=UTF-8' });
	busboy.on('file', (fieldname: any, file: any, info: any) => {
		let arr = [];
		arr = info.filename.toString().split('.');//对传递的文件名进行拆分
		// 上传文件 文件中文名乱码
		// console.log(info.filename, decodeURIComponent(info.filename))
		// console.log(__dirname, __filename)
		const dirname = "./server/uploads"
		console.log(fs.existsSync(dirname))
		if(!fs.existsSync(dirname)) {
			fs.mkdir(dirname, (err:any) => {
			    console.log(err);
			})
		}
		
		const date: any = new Date()
		const pathData = arr[0] + '(' + parseInt(Date.parse(date).toString().substr(0, 10)) + ')';//文件名＋十位时间戳.文件类型
		const saveTo = path.join(__dirname, 'uploads', pathData + '.' + arr[1]);
		file.pipe(fs.createWriteStream(saveTo));
		file.on('data', function(data: any) {
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
});
// 测试post接口
app.post("/add_list", (req: any, res: any) => {
	res.statusCode = 200
	res.send({ name: 'name' })
});

const server = app.listen(3333, function() {
	console.log('listening on *:3333');
});
var ws = io.listen(server);
