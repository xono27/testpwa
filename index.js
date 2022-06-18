const express = require("express");

const app = express();

// app.use(express.static('/'))
app.get("/",(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

var PORT = process.env.PORT ||  3000;


// App listening on the below port
app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});