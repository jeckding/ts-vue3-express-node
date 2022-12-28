import { Request, Response } from "express";
const fs = require("fs")
interface Object {
	[key: string]: string;
}
// export const getImage = (path: string) => {
// 	const fileList = []
	
//   return fileList
// };

// export const getFile = (req: Request, res: Response) => {
//   res.json({
//     title: "返回json title"
//   });
// };
export const readFileList = (path: string, fileList: Array<object>) => {
	const file = fs.readdirSync(path);
	file.forEach((item: string, index: number) => {
		const stat = fs.statSync(path + item)
		console.log(stat)
		if(stat.isDirectory()) {
			readFileList(path + item + "/", fileList)
		} else {
			let obj:Object= {};//定义一个对象存放文件的路径和名字
			obj.path = path;//路径
			obj.filename = item//名字
			fileList.push(obj);
		}
	})
	return fileList
};