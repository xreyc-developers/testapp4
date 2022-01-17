const functions = require("firebase-functions");
const mailjet = require ('node-mailjet')
.connect('517e7b876cbeee308bf203163c358d5b', 'db0cc97a5af94243b3043f1409448ce9')

const admin = require('firebase-admin');
admin.initializeApp();

const sendMessage = () => {
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[{
            "From": {
                "Email": "segumareyco@gmail.com",
                "Name": "Reyco"
            },
            "To": [{
                "Email": "segumareyco@gmail.com",
                "Name": "Reyco"
            }
        ],
        "Subject": "THIS IS A TEST MESSAGE",
        "TextPart": "I AM AWESOME",
        "HTMLPart": "<h3>Dear Reyco, I am awesome</h3>",
        "CustomID": "AppGettingStartedTest"
        }
    ]
    });

    request
        .then((result) => {
            console.log("EMAIL SENT")
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}

const checkNumber = (number) => {
    return number % 10 === 0;
}

// LISTEN ON UPDATED
exports.counterUpdatedListener = functions.firestore
    .document('counter/{documentId}')
    .onUpdate((snapshot, context) => {
        const currCount = snapshot.after.data().count;
        console.log(currCount);
        const isDivisibleByTen = checkNumber(currCount);
        if(isDivisibleByTen) {
            sendMessage();
        }
        return Promise.resolve();
    }); 