
export const showMessage = (status: number ) => {
	interface MSG {
		[propName: number]: string
	}
	let msgObj: MSG = {
		0: "成功",
		1: "失败",
		200: "请求成功",
		1000: "暂无数据",
		1001: "请检查填写内容，内容不合法",
		1002: "数据已存在",
		1003: "数据不存在",
		1004: "用户不存在",
		1005: "该账号已被禁用",
		1006: "密码不正确",
		1007: "账号无产品权限",
		1008: "Token不存在",
		1009: "Token不合法",
		1010: "新密码不能与原密码相同",
		1011: "验证码无效",
		1012: "邮箱未注册",
		1013: "邮件发送失败",
		1014: "账号无系统角色权限",
		1015: "账号无系统功能权限",

		1023: "文件上传失败",
		1024: "文件不能为空",
		1025: "不支持多文件上传",
		1026: "文件格式不正确",
		1027: "文件名称超出长度",
		1028: "超出最大文件数量",
  }
  console.log(msgObj[status] || `请求失败(${status})!`)
  return msgObj[status] || `请求失败(${status})!`
}