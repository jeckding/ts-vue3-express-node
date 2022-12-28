import request from "../serve/request"

export default{
	getList: async () => {
		return await request.get("/list")
	},
	addList: async (params = {}) => {
		const data = await request.post("/add_list", params)
		console.log(data)
		return await request.post("/add_list", params)
	},
	uploadFile: async (params = {}) => {
		return await request.post("/upload_file", params)
	},
}