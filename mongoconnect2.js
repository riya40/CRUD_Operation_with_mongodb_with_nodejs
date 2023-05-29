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

async function deleteDocument(empid){
    try{
        const employee = await Employee.findOneAndDelete({empid});
        console.log("user Deleted:",employee)
    }catch(error){
        console.error("error in user Deletion",error)
    }
}
async function wildCardSearchdisplayEmployee(searchParams){
    try{
        const searchCriteria = {
            $and:[
                {name:{$regex :new RegExp(searchParams.name,'i')}},
                {email:{$regex :new RegExp(searchParams.email,'i')}}
            ]
        };
        const employee = await Employee.find(searchCriteria);
        console.log('employee:')
        employee.forEach((employee) => {
            console.log(`name:${employee.empid},name:${employee.name},email:${employee.email}`);
        });
    }catch(error){
        console.error('error searching in employee:',error)
    }
}


async function dispalyrecords(){
    try{
        const employee = await Employee.find()
        console.log("Employees:") 
        employee.forEach((employee) => {
            console.log(`name:${employee.empid},name:${employee.name},email:${employee.email}`);
        });
    }catch(error){
        console.log("error in display records",error)
    }
}

async function main(){
    console.log("-------Connecting to database-------")
    await connectToDatabase();
    console.log("-----------creating the user documents------------")
    await createDocument(108,'tripura','edcba@gmail.com')
    
    console.log("-----------creating the updating documents------------")
    await updateDocument(101,'priya','priyanka@gmail.com')

    await wildCardSearchdisplayEmployee({name:'a',email:'gmail.com'})
    console.log("---------displaying the records----------")
    await dispalyrecords()
    console.log("-----------Deleting the user documents------------")
    await deleteDocument(101);
    await deleteDocument(102);
    await deleteDocument(103);
    await deleteDocument(104);
    
    
    console.log("------end------")
    mongoose.disconnect()
}

main()







