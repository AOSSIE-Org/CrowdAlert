// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Every time the report counter in update, this will check against the threshold
// and set the visibility
const report_threshold = 10;
exports.report = functions.database.ref('/incidents/{reportId}/report_count')
	.onWrite(event => {
		const original = event.data.val();
		if (original > 10){
			return event.data.ref.parent.child('visible').set(false);		
		}
		
	});

exports.sendNotification = functions.database.ref('/incidents/{pushId}')
    .onWrite(event => {
        //hello World
    });
