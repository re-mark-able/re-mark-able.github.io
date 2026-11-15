// Script - register.js
// This script validates a form.

// Function called when the form is submitted.
// Function validates the form data.
function validateForm(e) {
    'use strict';

    // Get the event object:
	if (typeof e == 'undefined') e = window.event;

    // Get form references:
	var firstName = U.$('firstName');
	var lastName = U.$('lastName');
	var email = U.$('email');
	var phone = U.$('phone');
	var city = U.$('city');
	var state = U.$('state');
	var zip = U.$('zip');
	var terms = U.$('terms');

	// Flag variable:
	var error = false;

	// Validate the first name:
	if (/^[a-zA-Z0-9 -]+$/i.test(firstName.value)) {
		removeErrorMessage('firstName');
	} else {
		addErrorMessage('firstName', 'Please enter your first name.');
		error = true;
	}
	if (/^[a-zA-Z0-9 -]+$/i.test(lastName.value)) {
		removeErrorMessage('lastName');
	} else {
		addErrorMessage('lastName', 'Please enter your last name.');
		error = true;
	}
	
	// Validate the email address:
	if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
		removeErrorMessage('email');
	} else {
		addErrorMessage('email', 'Please enter your email address.');
		error = true;
	}
	// Validate the password:
	if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(password.value)) {
		removeErrorMessage('password');
	} else {
		addErrorMessage('password', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
		error = true;
	}

	if (confirmPassword.value.length > 0) {
		removeErrorMessage('confirmPassword');
	} else {
		addErrorMessage('confirmPassword', 'Confirm password cannot be empty..');
		error = true;
	}

	// Validate the confirmPassword:
	if (password.value === confirmPassword.value) {
		removeErrorMessage('confirmPassword');
	} else {
		addErrorMessage('confirmPassword', 'Passwords must match.');
		error = true;
	}

	/*
	// Validate the phone number:
	if (/\d{3}[ \-\.]?\d{3}[ \-\.]?\d{4}/.test(phone.value)) {
		removeErrorMessage('phone');
	} else {
		addErrorMessage('phone', 'Please enter your phone number.');
		error = true;
	}
	
	// Validate the state:
	if (state.selectedIndex != 0) {
		removeErrorMessage('state');
	} else {
		addErrorMessage('state', 'Please select your state.');
		error = true;
	}
	
	// Validate the zip code:
	if (/^\d{5}(-\d{4})?$/.test(zip.value)) {
		removeErrorMessage('zip');
	} else {
			addErrorMessage('zip', 'Please enter your zip code.');
		error = true;
	}
 */
    // If an error occurred, prevent the default behavior:
	if (error) {

		// Prevent the form's submission:
	    if (e.preventDefault) {
	        e.preventDefault();
	    } else {
	        e.returnValue = false;
	    }
	    return false;
    
	}
    
} // End of validateForm() function.

// Function called when the terms checkbox changes.
// Function enables and disables the submit button.
function toggleSubmit() {
	'use strict';
    
	// Get a reference to the submit button:
	var submit = U.$('submit');
	
	// Toggle its disabled property:
	if (U.$('terms').checked) {
		submit.disabled = false;
	} else {
		submit.disabled = true;
	}
	
} // End of toggleSubmit() function.

// Establish functionality on window load:
window.onload = function() {
    'use strict';

	// The validateForm() function handles the form:
    U.addEvent(U.$('theForm'), 'submit', validateForm);

	// Disable the submit button to start:
	U.$('submit').disabled = true;

	// Watch for changes on the terms checkbox:
    U.addEvent(U.$('terms'), 'change', toggleSubmit);

	// Enbable tooltips on the phone number:
	// U.enableTooltips('phone');
	U.enableTooltips('password');
	// U.enableTooltips('email');
    
};