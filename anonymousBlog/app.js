var express     = require("express"),
app             = express(),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose");



mongoose.connect("mongodb://localhost/AnonymousBlogDb",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");

// mongoose schema and model creation

var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    postText : String,
    postTime : {type:Date , default:Date.now}
});

var blogPost = new mongoose.model("post",blogSchema);

// create post in db for testing

// blogPost.create({
//     title:"Sajid",
//     image:"https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg",
//     postText:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga facere soluta mollitia. Commodi nemo sed quisquam, maiores impedit harum magnam fugit cumque magni veniam! Similique, eos deserunt veritatis et in eum ipsum consequatur accusamus, quia inventore quibusdam eligendi repellendus saepe explicabo distinctio. Fugit delectus quas corporis, quaerat unde ipsa commodi repudiandae voluptatum, ex dicta ullam dolor."},
//     (err,postData)=>{
//     console.log(postData);
// });




// home or index route
app.get("/",(req,res) => {
    res.redirect("/home");
});

app.get("/home",(req,res) => {
    res.render("index");
});

// all posts route

app.get("/posts",(req,res) => {
    
    blogPost.find({},(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("error");
        }
        else{
            res.render("allPosts",{blogPosts:result});
        }
    });
    
    
});

// create get and post route
app.get("/create",(req,res)=>{
    res.render("createPost");
});

app.post("/create",(req,res)=>{

    blogPost.create({
        title: req.body.title,
        image: req.body.image,
        postText:req.body.postText
    },(err,postData)=>{
        console.log(postData);
    });
    
    res.redirect("/home");
});



// show post route
app.get("/show/:id",(req,res) => {
    blogPost.findById(req.params.id,(err,result) => {
        if(err){
            res.render("error");
        }
        else{
            res.render("showPost",{postDetails:result});
        }
    });
    
});

// Edit route 

app.get("/show/:id/edit",(req,res)=>{

    blogPost.findById(req.params.id,(err,data)=>{
        if(err){
            res.render("error");
            console.log(err);
        }
        else{
            res.render("edit",{data:data});
        }
    });

});

// Update route

app.post("/show/:id",(req,res)=>{

    // findByIdAndUpdate parameters are (id,newdata,callback)

    blogPost.findByIdAndUpdate(req.params.id, req.body, (err,data)=>{
        if(err){
            res.render("error");
        }
        else{
            res.redirect("/posts");
        }
    });

});

// Delete mechaniz

app.get("/show/:id/delete",(req,res)=>{
    blogPost.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            res.render("error");
        }
        else{
            res.redirect("/posts");
        }
    });
});

// about route

app.get("/about",(req,res) => {
    res.render("about");
});









// error show route
app.get("*",(req,res) => {
    res.render("error");
});


// app listen

app.listen("3000","127.0.0.1",() => {
    console.log("Server started");
});