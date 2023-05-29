const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    id:Number,
    name:String ,
    email:String,
    department:String,
    city:String,
    phonenumber:Number
})

const Contact = mongoose.model('Contact',contactSchema);

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


async function createDocument(id,name,email,department,city,phonenumber){
    try{
        const contact = new Contact({id,name,email,department,city,phonenumber})
        await  contact.save()
        console.log("contact created:",contact)
    }catch(error){
        console.error("error in user creation",error)
    }
}

async function updateDocument(id,name,email,department,city,phonenumber){
    try{
        const contact= await Contact.findOneAndUpdate(
            {id},                     //to find via primary key
            {name,email,department,city,phonenumber},          //fields to update
            {new: true}
        );
        console.log('Updated!!: ',contact);
    }catch(error){
        console.error('Error updating: ',error)
    }

}


async function deleteDocument(id){
    try{
        const contact = await Contact.findOneAndDelete({id});
        console.log("user Deleted:",contact)
    }catch(error){
        console.error("error in user Deletion",error)
    }
}

async function wildCardSearchdisplayEmployee(searchParams){
    try{
        const searchCriteria = {
            $and:[
                {name:{$regex :new RegExp(searchParams.name,'i')}},
                {email:{$regex :new RegExp(searchParams.email,'i')}},
                {city:{$regex :new RegExp(searchParams.city,'i')}},
                {department:{$regex :new RegExp(searchParams.department,'i')}},
            ]
        };
        const contact = await Contact.find(searchCriteria);
        console.log('contacts:')
        contact.forEach((contact) => {
            console.log(`name:${contact.id},name:${contact.name},email:${contact.email},department:${contact.department},city:${contact.city}`);
        });
    }catch(error){
        console.error('error searching in employee:',error)
    }
}


async function dispalyrecords(){
    try{
        const contact = await Contact.find()
        console.log('contacts:')
        contact.forEach((contact) => {
            console.log(`name:${contact.id},name:${contact.name},email:${contact.email},department:${contact.department},city:${contact.city},phonenumber:${contact.phonenumber}`);
        });
    }catch(error){
        console.log("error in display records",error)
    }
}

async function main(){
    console.log("-------Connecting to database-------")
    await connectToDatabase();

    console.log("-----------creating the user documents------------")
    await createDocument(101,'lakshmi','abc@mail.com','security','drm','242536')
    await createDocument(102,'priyanka','dbc@mail.com','network','rcpm','22134')
    
    console.log("-----------creating the updating documents------------")
    await updateDocument(101,'priya','priyanka@gmail.com','cyber','drm',242536)

    await wildCardSearchdisplayEmployee({name:'a',email:'gmail.com',department:'a',city:'m'})
    
    console.log("---------displaying the records----------")
    await dispalyrecords()
    
    console.log("-----------Deleting the user documents------------")
    await deleteDocument(101);
    await deleteDocument(102);
    
    
    console.log("------end------")
    mongoose.disconnect()
}

main()

