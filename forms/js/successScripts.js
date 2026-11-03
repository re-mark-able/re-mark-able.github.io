window.onload = function() {
    "use strict";

    var formValues = JSON.parse(localStorage.getItem("userData"));

    if (!formValues) {
        window.location.href = "register.html";
    } else {
       document.getElementById("firstName").textContent = formValues.firstName;
        document.getElementById("email").textContent = formValues.email;
    }
};