
import $ from 'jquery';

const mockUrl = 'http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/';
const signupForm = $('#signup-form');
const signinForm = $('#signin-form');
const addProductForm= $('#add-product-form');
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
			//clearSignUpForm();
			$(signupForm).prepend('<div class="alert alert-success">User created successfully.</div>');
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
				
				window.location.href = '/products.html';
			} else {
				$(signinForm).prepend('<div class="alert alert-danger">Incorrect username or password</div>');
				
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
$("#add-product-button").click((e) => {
	 
	alert("message");
	e.preventDefault();
	
	// const productName = $("#productName").val();
	// const productDescription = $("#productDescription").val();
	// const price= $("#price").val();
	// const status = $("#status").val();
	
	// const product = {
	// 	productName: productName,
	// 	productDescription: productDescription,
	// 	price: price,
	// 	status: status
	// };

	// promise = $.post(mockUrl + "jproducts", product);

	// promise.then(
	// 	() => {
	// 		clearAddForm();
	// 		$(addProductForm).prepend('<div class="alert alert-success">Product added successfully.</div>');
			
	// 	},
	// 	error => console.log('error: ', error)


	// );

	
});

/* ############ End Add product Form ###################### */