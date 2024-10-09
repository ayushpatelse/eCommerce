const express = require('express'); // "require" the Express module
const app = express(); // obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080; // assign a port
const path = require('path'); // adding the path 
const dataserver = require(__dirname +'/store-service.js');
app.use(express.static('public'));

onHttpStart = () => {
    console.log('Express http server listening on port ' + HTTP_PORT);
}
// To send request of redirect default page
app.get('/',(req,res)=>{

    res.redirect('/about');
    
})
// To send request of shop
app.get('/shop', (req, res) => {
    dataserver.getPublishedItems()
    .then((data) => {
        res.json(data); // Send published items data
    })
    .catch((err) => {
        res.json({ message: err });
    });
});
// To send request of About
app.get('/about',(req,res)=>{

    res.sendFile(path.join(__dirname, '/views/about.html'));

})


// To send categories if necessary
app.get('/categories',function(req,res){
    dataserver.getAllCategories()
    .then((data)=>{
        console.log("All Items Json");
        res.json(data);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
    })

});

app.get('/items',function(req,res){
    dataserver.getAllItems()
    .then((data)=>{
        console.log("All Items Json");
        res.json(err);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
    })

});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});


//initialize server
dataserver.initialize()
    .then(() => {
        console.log("Server intialize");
        app.listen(HTTP_PORT, onHttpStart);  //start the server 
    })
    .catch(err => {
        console.log(err);
    })
