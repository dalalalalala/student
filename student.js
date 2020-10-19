//数据操作模块
//职责:操作文件中的数据，只处理数据,不关心业务
var fs = require('fs')
const { parse } = require('path')

exports.find=function(callback){
  fs.readFile('./db.json', function (err, data) {
    if(err){
      return callback(err)
    }
    callback(null,JSON.parse(data).students)
  
  })
}

// 通过id来选择对应的对象
exports.findById = function(id,callback){
  fs.readFile('./db.json',function(err,data){
    if(err){
      return callback(err)
    }
    var students=JSON.parse(data).students
    var result = students.find(function(item){
      return parseInt(item.id) === parseInt(id)
    })
    callback(null,result)
  })
}

/**添加保存学生 */
exports.save = function (student,callback){
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    //获取到的JSON.parse(data)是对象,JSON.parse(data).students是数组

    // 自动生成id
    student.id = students[students.length-1].id+1
    students.push(student)

    var result = JSON.stringify({
      students:students
    })
    fs.writeFile('./db.json',result,function(err,data){
      if(err){
        return callback(err)
      }
      callback(null)
    })


  })
}

/**更新学生 */
exports.update = function (student,callback) {
  //通过id来进行更新
  //首先还是要读文件
  fs.readFile('./db.json',function(err,data){
    if(err){
      return callback(err);
    }
    // 转换为字符串格式
    var students = JSON.parse(data).students
 
    // 要修改谁，就要把谁找出来
    var stu  = students.find(function(item){
      return parseInt(item.id) === parseInt(student.id)
    })

    student.id = parseInt(student.id)
    for(var key in student){
      stu[key] = student[key];
    }

    // 转换成json格式
    var result = JSON.stringify({
      students:students
    })

    fs.writeFile('./db.json',result,function(err){
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

/**删除学生 */
exports.delete = function (id,callback) {
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    // console.log(students[id-1].id)
    // var result = students.find(function (item) {
      
    //   return parseInt(item.id) === parseInt(id)
    // })

    /**
     * 方法一：
     * var index = students.findIndex(function(item){
     *    return item.id == parseInt(id)
     * })
     */

    //  方法二：
    var index = students.map(function (item) {
      return parseInt(item.id);
    }).indexOf(parseInt(id))

    console.log(index)
    students.splice(index, 1)
     

    // console.log(students)
    var deleteStu=JSON.stringify({
      students: students
    })
    fs.writeFile('./db.json', deleteStu,function (err) {
      if (err) {
        return callback(err)
      }
    })
    callback(null)
  })
  

}

