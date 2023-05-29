const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    empid:Number,
    name:String ,
    email:String,
})

const Employee = mongoose.model('Employee',employeeSchema);

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

async function createDocument(empid,name,email){
    try{
        const employee = new Employee({empid,name,email})
        await  employee.save()
        console.log("user created:",employee)
    }catch(error){
        console.error("error in user creation",error)
    }
}

async function updateDocument(empid,name,email){
    try{
        const employee= await Employee.findOneAndUpdate(
            {empid},                     //to find via primary key
            {name,email},          //fields to update
            {new: true}
        );
        console.log('Updated!!: ',employee);
    }catch(error){
        console.error('Error updating: ',error)
    }

}





