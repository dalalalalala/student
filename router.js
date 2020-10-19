
var express = require('express')

var Students = require('./student')

// 1、创建一个路由容器
var router = express.Router();

// 2、把所有的路由都挂载在router上
router.get('/students', function (req, res) {
  // 读文件
  // fs.readFile('./db.json', function (err, data) {
  //   if (err) {
  //     return res.send('err')
  //   }
  //   res.render('index.html', {
  //     fruits: [{ name: '苹果' }, { name: '猕猴桃' }, { name: '香蕉' }, { name: '葡萄' }],
  //     students: JSON.parse(data).students
  //   })
  // })
  Students.find(function(err,students){
    if(err){
      return res.send('Server error')
    }
    res.render('index.html',{students:students})
  })


});

router.get('/students/new',function(req,res){
  // res.render() 默认找到views文件夹下的html文件
  res.render('new.html')
})


router.post('/students/new', function (req, res) {
  //1.获取表单的数据
  // body-parser
  console.log(req.body)
  //2处理
      //将数据保存到db. json文件中，将数据持久化
      //由于我们写入文件会把之前的数据都给覆盖掉, 所以我们只能将之前的数据(字符串格式)读出来，转换成对象, 取出数组，把req.body添加push进数组的最后一项
  Students.save(req.body,function(err){
    if(err){
      return res.send('Server error')
    }
    res.redirect('/students')
  })
  //3发送响应
})


// Students.update({ "id": 1, "name": "张三", "gender": "1", "age": "22", "hobbies": "吃饭" },function(err){
//   if(err){
//     return console.log('失败')
//   }
//   console.log('成功')
// })

router.get('/students/edit', function (req, res) {
  // req:客户端到服务端；res：服务端到客户端

  //1.在客户端列表页中处理链接问题（要有id）
      // <a href="/students/edit?id={{$value.id}}">编辑</a>
  //2.获取要编辑的学生id

  // 由于此时req.query.id为字符串类型而json文件为int所以需要转换为int类型
  Students.findById(req.query.id,function(err,student){
    if(err){
      return res.send('server error')
    }

    res.render('edit.html',{
      student:student
    })
  })
  //3.渲染编辑页面
})


router.post('/students/edit', function (req, res) {
  console.log(req.body)
  Students.update(req.body,function(err){
    if(err){
      return res.send('serrver error')
    }
    res.redirect('/students')

  })
})
router.get('/students/delete', function (req, res) {
  // console.log(req.query.id)
  // req.query.id 用来获取前端的某一项 例如：<a href="/students/edit?id={{$value.id}}">编辑</a>
  Students.delete(req.query.id,function(err){
    if (err) {
      return res.send('server error')
    }
    res.redirect('/students')
    // console.log(student)
  })
 
  
})


// 3、导出
module.exports = router
