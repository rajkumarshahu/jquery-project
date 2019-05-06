
import $ from 'jquery';

const mockUrl = 'http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/';
const signupForm = $('#signup-form');
const signinForm = $('#signin-form');
const addProductForm= $('add-product-form');
let promise = null;

/* ########### SignUp Form  ############## */

const clearSignUpForm = () => {
	$("#fullName").val('');
	$("#email").val('');
	$("#userName").val('');
	$("#password").val('');
};


const clearSignInForm = () => {
	$(':input',signinForm).val('');
};

const clearAddForm = () => {
	$(':input',addProductForm).val('');
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
				window.location.href = '/src/products.html';
			} else {
				
				alert('Username && Password is incorrect !!');
				/* clearfunction */
				clearSignInForm();
				
			}
			
		},
		error => console.log('error: ', error)
	);

	e.preventDefault();
});
/* ############ End SignIn Form ###################### */


/* ############ Start Add product Form ###################### */
$("#add-button").click((e) => {
   
	const productName = $("#productName").val();
	const productDesc = $("#productDesc").val();
	const price= $("#price").val();
	const status = $("#status").val();
	
	const product = {
		productName: productName,
		productDesc: productDesc,
		price: price,
		status: status
	};

	promise = $.post(mockUrl + "jproducts", product);

	promise.then(
		() => {
			clearAddForm();
			alert('Product added sucessfully');
			
		},
		error => console.log('error: ', error)
	);

	e.preventDefault();
});

/* ############ End Add product Form ###################### */