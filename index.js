const express = require("express");

const app = express();
const webPush = require('web-push');

// if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
//   console.log(webPush.generateVAPIDKeys());
//   return;
// }
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  'https://imppwa.herokuapp.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(express.static(__dirname));
app.get("/",(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get(route + 'vapidPublicKey', function(req, res) {
    res.send(process.env.VAPID_PUBLIC_KEY);
  });

  app.post(route + 'register', function(req, res) {
    // A real world application would store the subscription info.
    res.sendStatus(201);
  });

  app.post(route + 'sendNotification', function(req, res) {
    // const subscription = req.body.subscription;
    // const payload = req.body.payload;
    // const options = {
    //   TTL: req.body.ttl
    // };

    setTimeout(function() {
      webPush.sendNotification()
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });
    }, 1000);
  });

var PORT = process.env.PORT ||  3006;


// App listening on the below port
app.listen(PORT, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORT);
});