const express =require('express');
const bodyParser = require("body-parser");
const ejs                    = require("ejs");
const mongoose               = require("mongoose");
const findOrCreate           = require('mongoose-findorcreate');
const app                    = express();

mongoose.connect("mongodb+srv://tanmay:tanmay@cluster0-byvwx.mongodb.net/hotel_management?retryWrites=true&w=majority",{useNewUrlParser:true ,useUnifiedTopology: true })
    .then(()=>console.log('DB CONNECTED...'))
    .catch(err=> console.log(err));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
var reviewSchema = new mongoose.Schema({
    text: String,
    status:String
});
const Review=new mongoose.model('Review',reviewSchema);

app.get('/',(req,res)=>{
    Review.find({},(err,foundReview)=>{
        if(err)console.log(err);
        else{
            res.render('page',{review:foundReview});
        }
    })
    // res.render('page');
});

app.post('/',(req,res)=>{
const review=new Review({
        text:req.body.text,
        status:'inqueue'
    });
    review.save();
    res.redirect('/');
});

const PORT= process.env.PORT;
app.listen(PORT,process.env.IP,()=>{
    console.log(`Server started on ${PORT}`);
});