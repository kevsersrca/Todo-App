var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//Connect database
mongoose.connect("mongodb://test:test@ds121222.mlab.com:21222/todo");
//Create Schema
var todoSchema = new mongoose.Schema({
  item:String
});
//create mode
var Todo = mongoose.model('Todo',todoSchema);
var urlencodedParser = bodyParser.urlencoded({extended: false});
//routes
module.exports = function(app){
//Get method
app.get('/todo',function(req,res){
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{ todos : data});
  });
});
//post method
app.post('/todo',urlencodedParser,function(req,res){
  var newTodo = Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
//delete method
app.delete('/todo/:item',function(req,res){
  Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
};
