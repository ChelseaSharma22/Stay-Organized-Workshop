"use strict";
const $ = document.querySelectorAll.bind(document);
const newuserForm = $("#newuserForm")[0];
const displayDiv = $("#addedinfo");
function getData() {
    const userName = $("#newuserName")[0].value;
    const userUsername = $("#newuserUserName")[0].value;
    const userPassword = $("#newuserPassword")[0].value;
    const reenterPass = $("#newuserRePassword")[0].value;

    function checkPass(_pass1, _pass2) {
        if (_pass1 != _pass2) {
            alert("The Password do not match");
        } else {
        const userInfo = {
            "Name" : userName,
            "Username" : userUsername,
            "Password" : userPassword
        }
        console.log(userInfo);
        }
    }  
    checkPass(userPassword, reenterPass);
}

newuserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getData();
})

