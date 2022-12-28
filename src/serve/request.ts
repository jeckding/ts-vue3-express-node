import axios , { AxiosInstance, AxiosRequestConfig, AxiosResponse }from 'axios'

import { showMessage } from './message'
const baseUrl: string= "http://localhost:3333"

const header = {
	token: "",
	"Content-Type": "application/json; charset=UTF-8",
	// 'Content-Type': 'multipart/form-data' 
}

const request: AxiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
})


request.interceptors.request.use((config: AxiosRequestConfig) => {
	console.log("'request config':" ,config)
	const {data, url} = config
	return config 
})

request.interceptors.response.use((config: AxiosResponse) => {
	const { status, statusText } = config
	// console.log(status, statusText)
	console.log('res config------: ',  config, config.status, config.statusText)
	console.log(showMessage(status))
	return config
})

export default request