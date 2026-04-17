const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;


app.use(express.json());
app.use(express.static('public')); // Fix ✅


let blogs = [];

function createSlug(title) {
    return title.toLowerCase().replaceAll(' ', '-');
}

// Create Blog(post)
app.post('/add',(req,res)=>{
         
     const { name , title , content } = req.body;
     const Slug = createSlug(title);

     blogs.push({name,Slug,content});
    //  fs.appendFileSync('data.json',JSON.stringify(blogs)); // Fix ✅
     res.send(" Added The Blogs ");
});

// Get All The Blogs :
app.get('/',(req,res)=>{
   res.json(blogs);
});


// Blog by sloug
app.get('/data/:slug',(req,res)=>{
     const blog = blogs.find( b => b.slug === req.params.slug );

     if(blog){
         res.json(blog);
         res.send('yes!');
     }else{
         res.send("no!");
     }

})


app.listen(port,(req,res)=>{ // Fix ✅
     console.log("Server is Running");
})