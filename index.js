const express = require("express");
const path = require("path")
const app = express();
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const URL = require("./models/url")
const {connectMDB} = require("./connect")
const PORT = 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/short-url";
connectMDB(DATABASE_URL)
.then(()=> console.log("Mongodb connected"))
app.set('view engine','ejs');
app.set('views', path.resolve('./views'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/",staticRoute);
app.use("/url",urlRoute);
app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                history:{
                    timestamp: Date.now()
                }
            },
        }
    );
    res.redirect(entry.redirectUrl)
});
app.listen(PORT,()=>{
    console.log("App is listening in port 3000")
})