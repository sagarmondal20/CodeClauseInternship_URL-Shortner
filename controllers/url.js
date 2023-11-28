const shortid = require("shortid");
const URL = require("../models/url")
async function handleGenerateShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:"url is required"})
    }
    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectUrl: body.url,
        history: []
    });
    return res.render("home",{
        id: shortID,
    });
}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.history.length, analytics:result.history})
}
module.exports = {
    handleGenerateShortURL,handleGetAnalytics
}