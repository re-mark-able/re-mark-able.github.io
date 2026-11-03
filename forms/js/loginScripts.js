
function validateChange() {
    "use strict";

    var password = document.getElementById("password").value;
    var emailAddress = document.getElementById("email").value;
    var allowSubmit = true;
    // Validate both are not empty
    
         var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password === "") {
            document.getElementById("password").classList.add("error");
            document.getElementById("passwordError").style.display = "inline-block";
            allowSubmit = false;
        } else {
            document.getElementById("password").classList.remove("error");
            document.getElementById("passwordError").style.display = "none";
        }
        if (emailAddress === "" || !emailRegex.test(emailAddress)) {
            document.getElementById("email").classList.add("error");
            document.getElementById("emailError").style.display = "inline-block";
            allowSubmit = false;
        } else {
            document.getElementById("email").classList.remove("error");
            document.getElementById("emailError").style.display = "none";
        }
        document.getElementById("loginSubmit").disabled = !allowSubmit;
    
}


window.onload = function() {
    "use strict";

    var loginFields = document.querySelectorAll(".login-field");
    loginFields.forEach(function(field) {
        field.addEventListener("input", function (e) {
            validateChange(e.target);
        });
        field.addEventListener("change", function (e) {
            validateChange(e.target);
        });
        field.addEventListener("keyup", function (e) {
            validateChange(e.target);
        });
    });
    

    var loginForm = document.getElementById("loginForm");
    if (loginForm.addEventListener) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Login successful!");
            window.location.href = "index.html";
        });
    }

}