// FOR FIREBASE INTEGRATION ADD THESE TWO LINES AT THE END OF THE BODY
//  <script src="https://www.gstatic.com/firebasejs/${JSCORE_VERSION}/firebase.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-database.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-firestore.js"></script>

// ADD THIS LINE AFTER CHANGING IN ANY FILE USING THE CLASS FROM THIS JS FILE
// import firebase_integration from '../Fire.js'
// change the directory according to your need

import React, { Component } from "react";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCoI_Hy_IJsXqDp_CtkdD1K81sqvTnzx7E",
  authDomain: "khana-shana-2020.firebaseapp.com",
  databaseURL: "https://khana-shana-2020.firebaseio.com",
  projectId: "khana-shana-2020",
  storageBucket: "khana-shana-2020.appspot.com",
  messagingSenderId: "734527584801",
  appId: "1:734527584801:web:f6cda3a79788e9af12c160",
  measurementId: "G-SC8N0VD5FC",
};

class firebase_integration extends Component {
  constructor() {
    super();
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
    this.storage = firebase.storage();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider()
      .addScope("user_birthday")
      .addScope("user_gender");
    this.auth = firebase.auth();
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getImageURL(divID, mainreferencefolder, path, imagename) {
    this.storage
      .ref(mainreferencefolder)
      .child(path + "/" + imagename)
      .getDownloadURL()
      .then(function (url) {
        document.getElementById(divID).src = url;
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }

  updateOrderQueueTracking(orderid, to) {
    this.database
      .collection("RegularOrder")
      .doc(orderid.toString())
      .update({
        Tracking: to,
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
  updateOrderQueueAction(orderid, to) {
    this.database
      .collection("RegularOrder")
      .doc(orderid.toString())
      .update({
        Action: to,
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }
  updateRestaurantDetails(arr, myData) {
    this.database
      .collection("RestaurantDetails")
      .doc("jOzlK1WWsNPdRrjcYLGv")
      .update({
        AboutUs: arr.AboutUs,
        Address: arr.Address,
        ContactDetails: arr.ContactDetails,
        Email: arr.Email,
        Name: arr.Name,
        Root: false,
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }

  login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser.user.emailVerified === false) {
          alert("Please verify your email to continue");
          this.logout();
        }
      });
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password, position) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    this.auth.currentUser.sendEmailVerification();
    this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  passwordreset(email) {
    return this.auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("Email Sent!");
      })
      .catch(function (error) {
        alert("An error occured. Please try again");
      });
  }

  getCurrentUsername() {
    // alert(this.auth.currentUser.displayName)
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getDisplayName() {
    var name = this.auth.currentUser.displayName;
    var nameArr = name.split(" ");
    return nameArr[0];
  }

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });
}

export default new firebase_integration();
