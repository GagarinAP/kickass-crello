const express    = require('express'),
      app        = express(),
      favicon    = require('serve-favicon'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      conf       = require('./conf/config'),
      path       = require('path'),
      port       = process.env.PORT || '3000';

mongoose.connect(conf.url);

const TodoSchema = new mongoose.Schema({
    name: String,
    updated_at: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', TodoSchema);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
    res.sendFile('index.html');
});

app.get('/api/todos', function(req, res, next) {
    Todo.find(function (err, todos) {
        if (err) return next(err);
        res.json(todos);
    });
});
app.post('/api/todo', function(req, res, next) {
    Todo.create(req.body, function (err, todo) {
        if (err) return next(err);
        res.json(todo);
    });
});
app.get('/api/todo/:id', function(req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) return next(err);
        res.json(todo);
    });
});
app.put('/api/todo/:id', function(req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
        if (err) return next(err);
        res.json(todo);
    });
});
app.delete('/api/todo/:id', function(req, res, next) {
    Todo.findByIdAndRemove(req.params.id, req.body, function (err, todo) {
        if (err) return next(err);
        res.json(todo);
    });
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, function(){
    console.log('Server run!');
});