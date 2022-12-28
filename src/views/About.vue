<template>
  <div class="about">
    <!-- <h1>{{data}}</h1> -->
	上传文件
	<form action="upload" method="post" enctype="multipart/form-data">
	  <input type="file" name="file" @change="handleUpload">
	</form>
	
	<el-input v-model="inputMsg"></el-input>
  </div>
</template>

<script lang="ts" setup>
	import {onMounted, reactive,toRefs, ref} from 'vue'
	import axios from 'axios'
	import AboutModel from '../model/about.model'
	import  io from "socket.io-client"
	const data = ref("")
	const inputMsg = ref("")
	const socket = io('http://localhost:3333',  {
	  path: '', 
	  transports:['websocket','xhr-polling','jsonp-polling']
	})
	

	socket.on("hello", (res) => {
	  console.log("hello: ", res);
	});
	socket.on('sendLog',(data: any) => {
		console.log("server: " + data)
	})
	
	onMounted(() => {
		socket.removeListener('message');
		
		socket.on("connection", (res) => {
		  console.log("连接成功: ", res);
		});
		
		socket.emit("post message"," from web message");
		
		// AboutModel.getList().then((res)=>{
		// 	console.log("res: "+ res)
		// })
		// .catch((error)=>{
		// 	console.log(error,'失敗');
		// })
		AboutModel.addList({name: "test"}).then((res: any) => {
			 data.value = res.data.name
		})
		.catch((error)=>{
			console.log(error,'失败');
		})
	})
	const handleUpload =(event) =>  {
		const file = event.target.files[0] || event.dataTransfer.files[0]
		const files = new FormData()
		files.append("files", file)
		console.log(file)
		files.append("name", "测试文件")
		AboutModel.uploadFile(files).then(res => {
			console.log(res)
		})
	}
	
</script>
