importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAxQ4bC6a7prN6AaQGNFjrnMcxZQ2ROGdc",
  authDomain: "webpushotificationdemo.firebaseapp.com",
  projectId: "webpushotificationdemo",
  storageBucket: "webpushotificationdemo.appspot.com",
  messagingSenderId: "465336260907",
  appId: "1:465336260907:web:50d29decb40c25833a4d6e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
