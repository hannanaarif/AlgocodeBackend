const express=require('express');
const bodyparser=require('body-parser')
const { ServerConfig } = require('./config');
const apiRoutes=require('./routes');
const errorHandler = require('./utils/errorHandler');
const { ATLAS_DB_URL } = require('./config/server.config');
const app=express();
const PORT=ServerConfig.PORT
const connectToDB = require('./config/db.config');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.text());

app.get('/ping',(req,res)=>{
   res.json({"message": "Pinging from home"})
})

app.use('/api',apiRoutes)

app.use(errorHandler);

app.listen(PORT,async()=>{
    console.log(`Server is running on ${PORT}`);
    await connectToDB();
    console.log("Successfully connected db"); 

})