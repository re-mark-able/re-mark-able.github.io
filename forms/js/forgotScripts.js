
function validateChange() {
    "use strict";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var emailAddress = document.getElementById("email").value;

    // Validate not empty and valid email format
    if (emailAddress !== "") { 
        if( emailRegex.test(emailAddress)) {
            document.getElementById("forgotSubmit").disabled = false;
            document.getElementById("email").classList.remove("error");
            document.getElementById("emailError").style.display = "none";
        } else {
            document.getElementById("email").classList.add("error");
            document.getElementById("forgotSubmit").disabled = true;
            document.getElementById("emailError").style.display = "inline-block";
        }
    } else {
        document.getElementById("forgotSubmit").disabled = true;
        
    }
}


window.onload = function() {
    "use strict";

    
    document.getElementById("email").addEventListener("input", function (e) {
        validateChange(e.target);
    });
    document.getElementById("email").addEventListener("change", function (e) {
        validateChange(e.target);
    });
    document.getElementById("email").addEventListener("keyup", function (e) {
        validateChange(e.target);
    });



    var forgotForm = document.getElementById("forgotForm");
    if (forgotForm.addEventListener) {
        forgotForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Password reset email sent!");
            window.location.href = "index.html";
        });
    }

}