const mongoose = require("mongoose");
const connectionString =


"mongodb+srv://srishti:1234@nodecluster.kwzgbcf.mongodb.net/TASK-MANAGER-DB?retryWrites=true&w=majority"
const connectDB = (url)=>{
return mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
}
module.exports= {connectDB}
