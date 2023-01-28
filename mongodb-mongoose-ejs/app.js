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
     .then((res)=>{ app.listen(7777); 
      console.log("db connection successful...")})
    .catch((err)=>{console.log(err)})


// register view engine
app.set('view engine', 'ejs');

//middlewares
//1.static file 
app.use(express.static('public')) 
//2.takes all urlencoded data from form and pass it on to object for post requests
app.use(express.urlencoded({extended: true}))
//thirdparty mw
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs' , async (req,res)=>{
  const record = await Blog.find();
  res.render('index', { title: 'All Blogs', blogs : record });
})

app.post('/blogs' , async (req, res)=>{
  //this hold all the data that we pass in form
//console.log(req.body)
//so for creating a new document, we need to create a new instance for blog
const blog= new Blog(req.body)
await blog.save() //saved in db , so that we can access it by db.find()
res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

//specific id 
app.get('/blogs/:id' , async (req,res)=>{
  const blogID= req.params.id;
  //console.log(blogID)
  const record = await Blog.findById(blogID)
  res.render('details' , {title: 'id' , blog: record })
})



app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
