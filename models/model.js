const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const schema1=new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1724250266900-2fa0e82f5ad6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        set: (v)=>
            v==="" 
            ? 'https://images.unsplash.com/photo-1724250266900-2fa0e82f5ad6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            :v,        
    },
})

const Photo = mongoose.model('Photo',schema1);

module.exports=Photo;