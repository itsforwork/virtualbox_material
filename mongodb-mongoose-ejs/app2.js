const express = require('express');
const morgan = require('morgan')
const mongoose= require('mongoose')
//accessing blog schema
const Blog= require('./models/blog')
// express app
const app = express();




//connect mongodb
const dbURI= "mongodb://localhost:27017/new"
//connecting mongoose to mongodb
mongoose.connect(dbURI)
     .then((res)=>{ app.listen(7777); // listen for requests only after db is connected, bcz there maybe possibilty that some requests(pages) needs data from databse
      console.log("db connection successful...")})
    .catch((err)=>{console.log(err)})


 //mongoose and mongo sandbox routes
app.get('/add-blog' , async (req, res)=>{
  console.log('inside')
  //creating new instance
  const blog= new Blog({
    title: "new Blog",
    snippet: "about my new blogsssssss",
    body: 'more about data'
  });
 
  const record= await blog.save()
  res.json(record);
  //either .then or use async await 
  // .then((result)=>{res.send(result)})
  // .catch((err)=>{console.log('printing error....' , err)})
})

 app.get('/all-blogs' , async (req,res)=>{
   const record= await Blog.find();
   res.json(record);
})






// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//third party middleware
//app.use(morgan('dev')) //this gives logs of server side

//static file middleare- comes with express
app.use(express.static('public')) //make a public folder and put all static files inside it.

//custom middleware which will run for all routes call, bcz it is at top of every routes

app.use((req,res,next)=>{
  console.log('new request is made..')
  console.log('host: ' , req.hostname)
  next(); //to pass it to next middleware
})


//just to check if next() is working
//if we keep this after any route, it will not get fired, because we will get respnse from that route already, so it wont fire any other middleware
app.use((req,res,next)=>{
  console.log('next new request is made..')
 
  next(); //to pass it to next middleware
})


//routes
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});



app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page //middleware
//positioning of middleware is very important, if we put this at the top then no other routes will be fired, bcz this middleware will execute first and will end request-respnse cycle.
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
