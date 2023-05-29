const mongoose = require('mongoose')



async function connectToDatabase(){
    try{
        await mongoose.connect('mongodb+srv://priyanunna20:Azzgif2YKmaMUtdb@cluster0.lxuh1mf.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('connected to mongodb');

    }catch(error){
        console.error('error connecting to mongodb',error)
    }

}


connectToDatabase();
