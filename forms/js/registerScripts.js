
function validateChange() {
    "use strict";
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var emailAddress = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var termsChecked = document.getElementById("terms").checked;
    var allowSubmit = true;
    // Validate both are not empty
    
         var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         var nameRegex = /^[a-zA-Z0-9 -]+$/;
         var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

         if (firstName === "" || !nameRegex.test(firstName)) {
            document.getElementById("firstName").classList.add("error");
            document.getElementById("firstNameError").style.display = "inline-block";
            allowSubmit = false;
        } else {
            document.getElementById("firstName").classList.remove("error");
            document.getElementById("firstNameError").style.display = "none";
        }
        if (lastName === "" || !nameRegex.test(lastName)) {
            document.getElementById("lastName").classList.add("error");
            document.getElementById("lastNameError").style.display = "inline-block";
            allowSubmit = false;
        } else {
            document.getElementById("lastName").classList.remove("error");
            document.getElementById("lastNameError").style.display = "none";
        }
        if (password === "" || !passwordRegex.test(password)) {
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
        if (confirmPassword === "" || password !== confirmPassword) {
            document.getElementById("confirmPassword").classList.add("error");
            document.getElementById("confirmPasswordError").style.display = "inline-block";
            allowSubmit = false;
        } else {
            document.getElementById("confirmPassword").classList.remove("error");
            document.getElementById("confirmPasswordError").style.display = "none";
        }
        if (!termsChecked) {
            document.getElementById("termsError").style.display = "inline-block";
            allowSubmit = false;
        } else {
            document.getElementById("termsError").style.display = "none";
        }
        document.getElementById("registerSubmit").disabled = !allowSubmit;
    
}


window.onload = function() {
    "use strict";

    var loginFields = document.querySelectorAll(".register-field");
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
    

    var loginForm = document.getElementById("registerForm");
    if (loginForm.addEventListener) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var form = document.getElementById("registerForm");
            var formData = new FormData(form);
            var submitData = {};
            formData.forEach((value, key) => {
                submitData[key] = value;
            });
            var userData = {
                firstName: document.getElementById("firstName").value,
                email: document.getElementById("email").value,
            };
            console.log("Form Data Submitted:", submitData);
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location.href = "success.html";
        });
    

       
    }

}