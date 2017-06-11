const express    = require('express'),
      app        = express(),
      favicon    = require('serve-favicon'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      conf       = require('./conf/config'),
      path       = require('path'),
      port       = process.env.PORT || '3000';

mongoose.connect(conf.url);
mongoose.Promise = global.Promise;

const TodoSchema = new mongoose.Schema({
    todo: String,
    active: {
        type: Boolean,
        default: true
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
    res.sendFile('index.html');
});

app.get('/api/todos', function(req, res) {
    Todo.find(function (err, todos) {
        if (err) return err;
        res.json(todos);
    });
});
app.post('/api/todo', function(req, res) {
    Todo.create(req.body, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});
app.get('/api/todo/:id', function(req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});
app.put('/api/todo/:id', function(req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});
app.delete('/api/todo/:id', function(req, res) {
    Todo.findByIdAndRemove(req.params.id, req.body, function (err, todo) {
        if (err) return err;
        res.json(todo);
    });
});

app.put('/api/todos', function(req, res) {
    Todo.find().where({ active: false }).remove().exec();
});

app.listen(port, function(){
    console.log('Server run!');
});