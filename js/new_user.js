"use strict";

// declear and assign variables
const $ = document.querySelectorAll.bind(document);
const newuserForm = $("#newuserForm")[0];
const displayDiv = $("#addedinfo");

// post request
async function sendPostRequest(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
}

// function for sending the userinfo to the api
  newuserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = $("#newuserName")[0].value;
    const userUsername = $("#newuserUserName")[0].value;
    const userPassword = $("#newuserPassword")[0].value;
    const reenterPass = $("#newuserRePassword")[0].value;

    const userInfo = {
        name : userName,
        username : userUsername,
        password : userPassword
    }

    function checkPass(_pass1, _pass2) {
        if (_pass1 === _pass2) {
            return userInfo;
        } else {
        alert("The Password do not match");
        }
    }  
    checkPass(userPassword, reenterPass);
    console.log(userInfo);
sendPostRequest("http://localhost:8083/api/users", userInfo)
    
})

