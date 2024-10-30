const express=require('express');
const problemRouter=require('./problem.routes')

const v1Router=express.Router();



console.log("v1 index.js");


v1Router.use('/problems',problemRouter);

v1Router.get('/ping', (req, res) => {
    res.json({ message: 'Pong from v1' });
});


module.exports=v1Router;