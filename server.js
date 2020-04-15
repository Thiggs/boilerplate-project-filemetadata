'use strict';

var express = require('express');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.redirect('/hello?name='+req.file.originalname+"&size="+req.file.size)
  
})

app.get('/hello', function(req, res){
  res.json({name: req.query.name, size: req.query.size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
