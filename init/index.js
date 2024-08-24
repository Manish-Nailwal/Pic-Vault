const mongoose = require('mongoose');

const data=require('./data.js');
const Photo=require('../models/model.js');


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

async function initDB(){
    await Photo.deleteMany({});
    await Photo.insertMany(data).then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}
initDB();