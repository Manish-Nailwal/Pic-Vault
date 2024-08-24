const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const Photo=require('./models/model.js');
const methodOverride=require('method-override');
const engine=require('ejs-mate');



const app=express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs',engine);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const mongoUrl='mongodb://127.0.0.1:27017/Gallery';
main()
.then(()=>{
    console.log('Connected Successful');
})
.catch((err)=>{
    console.log(err);
    console.log('Connection Unsuccessful');
})

async function main(){
    await mongoose.connect(mongoUrl);
}

//APIs req 

//fullscreen
app.get('/zoom/:id',async(req,res)=>{
    const {id}=req.params;
    const data=await Photo.findById(id);
    res.render('full',{data});
})



//expand
app.get('/expand/:id',async (req,res)=>{
    const {id}=req.params;
    const data=await Photo.findById(id);
    res.render('expand',{data});
})

//Delete

app.delete('/view/:id',async (req,res)=>{
    const {id}=req.params;
    const data=await Photo.findByIdAndDelete(id);
    res.redirect('/view');
})

//edit route
app.get('/edit/:id',async (req,res)=>{
    const {id}=req.params;
    const data=await Photo.findById(id);
    res.render('edit',{data});
})

//middleware for converting tag into array
app.use('/expand/:id',(req,res,next)=>{
    let tags=req.body.tags;
    req.body.tags=tags.split(',').map(item=>item.trim()).filter(item=>item !== "");
    req.body={data: req.body};
    return next();
})

//updating data to db
app.patch('/expand/:id',async (req,res)=>{
    const {id}=req.params;
    const data=await Photo.findByIdAndUpdate(id,{...req.body.data}).then((res)=>{
        console.log(res);
        console.log('Updated Successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect(`/expand/${id}`);
})





//show route
app.get('/view',async (req,res)=>{
    const data = await Photo.find({});
    res.render('show',{data});
})

//add route
app.get('/add',(req,res)=>{
    res.render('add');
})

//middleware for converting tag into array
app.use('/view',(req,res,next)=>{
    let tags=req.body.tags;
    req.body.tags=tags.split(',').map(item=>item.trim()).filter(item=>item !== "");
    req.body={data: req.body};
    return next();
})

//inserting new data to db
app.post('/view',async (req,res)=>{
    await Photo.insertMany({...req.body.data}).then((res)=>{
        console.log(res);
        console.log('Added Successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect('/view');
})

//homepage
app.get('/',(req,res)=>{
    res.render('home');
})





app.use('/',(req,res)=>{
    res.send('<h1 style="font-size:50px">Error 404 <br> Page not found !</h1>')
})


app.listen(8080,(req,res)=>{
    console.log('Listening..');
})