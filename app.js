const express    = require("express"),
      app        = express(),
      favicon    = require("serve-favicon"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      conf       = require("./conf/config"),
      path       = require("path"),
      port       = process.env.PORT || "3000",
      api        = require("./routes/api");

mongoose.connect(conf.url);
mongoose.Promise = global.Promise;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

app.get("/", function(req,res){
    res.sendFile("index.html");
});

app.listen(port, function(){
    console.log("Server run!");
});

module.exports = app;