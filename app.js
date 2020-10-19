/**
模块职责要明确
app.js入内模块
职责:
创建服务
做一些服务相关的配置
模板引擎
body parser中 间件解析表单, post请求体
提供静态资源服务
挂载路由
监听端口启动服务
 */


var router = require('./router')

var express = require('express');
var app = express()
var bodyParser = require('body-parser')

// 放开静态资源
app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

// express-art-template   使用{{each xxx}} {{/each}},使用render()
app.engine('html',require('express-art-template'))

//配置模板引擎body-parser一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// 使用router
app.use(router)

app.listen(3000,function(){
  console.log('running 3000...')
})

/**********  设计路由***********/

/*
/请求方法     / 请求路径           /get参数     /post参数              /备注
GET             /students                                            渲染首页
GET             /students/new                                     渲染添加学生的页面
POST            /students/new            name,age,gender,hobbies  处理添加学生的请求
GET             /students/edit      id                              渲染编辑页面
POST            /students/edit           name,age,gender,hobbies    处理编辑请求
GET             /students/delect    id                              处理删除请求

*/
