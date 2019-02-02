const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs'); // set key value pair


// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(error) => {
    if(error) throw error

  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('scream',(text) => {
  return text.toUpperCase();
});

app.get('/',(request, response) => {
  response.render('home.hbs',{
    pageTitle: "Home Page",
    message: "Welcome"
  })
});


app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle : "About Page",
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage : "Unable to connect",
    errorCode : 402
  });
});

app.listen(3001,() => {
  console.log("Starting server");
});