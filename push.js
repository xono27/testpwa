const push = require('web-push');

// const GCM_API_KEY = '********';
push.setGCMAPIKey();

const data = {
    'endpoint': 'https://imppwa.herokuapp.com',
    'userAuth': 'asfdadsf',
    'userPublicKey': 'adgadgadg'
};

push.sendNotification(data.endpoint, {
    payload:       'push test for service worker',
    userAuth:      data.userAuth,
    userPublicKey: data.userPublicKey,
})
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.error('fail', err);
    });