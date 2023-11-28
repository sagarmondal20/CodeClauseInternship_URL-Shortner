const mongoose =require("mongoose");
mongoose.set("strictQuery",true);
async function connectMDB(url){
    return mongoose.connect(url);
}
module.exports = {
    connectMDB
}