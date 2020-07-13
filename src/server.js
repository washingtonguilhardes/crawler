const express = require('express');
const {json} = require('body-parser');
const  routes  = require('./routes');
const app = express();

const port = process.env.PORT || 3000;

app.use(json());

app.use('/products', routes);

 function run(){
    app.listen(port, ()=>{
        console.log(`>> Crawler server is ready in ::${port}`)
    });
}


module.exports = exports = {
    run
}