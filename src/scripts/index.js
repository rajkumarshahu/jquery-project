
import $ from 'jquery';

const mockUrl = 'http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/';
const signupForm = $('#signup-form');
const signinForm = $('#signin-form');
let promise = null;

/* ########### SignUp Form  ############## */

const clearSignUpForm = () => {
	$("#fullName").val('');
	$("#email").val('');
	$("#userName").val('');
	$("#password").val('');
};

const clearSignInForm = () => {

};

$("#submit-button").click((e) => {
   
	const fullName = $("#fullName").val();
	const email = $("#email").val();
	const userName= $("#userName").val();
	const password = $("#password").val();
	
	const user = {
		fullName: fullName,
		email: email,
		userName: userName,
		password: password
	};

	promise = $.post(mockUrl + "jusers", user);

	promise.then(
		() => {
			clearSignUpForm();
			alert('User create sucessfully 1');
		},
		error => console.log('error: ', error)
	);

	e.preventDefault();
});

/* ############# End of SignUp Form  ############## */

/* ############ SignIn Form ###################### */

$("#login-button").click((e) => {
	const userName = $("#userNames").val();
	const password = $("#passwords").val();

	promise = $.get(mockUrl + "jusers");

	promise.then(
		(data) => {
			//* filter
			const result = data.filter(x => x.userName == userName && x.password == password);
			if (result.length > 0)
			{
				alert('Sucesfully Login !!');
			} else {
				alert('Username && Password is incorrect !!');
				/* clearfunction */
			}
			
		},
		error => console.log('error: ', error)
	);

	e.preventDefault();
});


/* ############ End SignIn Form ###################### */