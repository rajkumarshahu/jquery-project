
import $ from 'jquery';

const mockUrl = 'http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/';
const signupForm = $('#signup-form');
const signinForm = $('#signin-form');
const addProductForm= $('#add-product-form');
const addCategoryForm=$('#add-category-form');
let productList = [];
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

const clearAddCategoryForm = () => {
	$(':input',addCategoryForm).val('');
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
				
				window.location.href = '/dashboard.html';
				
				
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
	const productName = $("#productName").val();
	const categoryName = $("#categoryName").val();
	const productDescription = $("#productDescription").val();
	const price= $("#price").val();
	const status = $("#status").val();
	
	const product = {
		productName: productName,
		productDescription: productDescription,
		categoryName: categoryName,
		price: price,
		status: status
		
	};

	promise = $.post(mockUrl + "jproducts", product);

	promise.then(
		() => {
			clearAddForm();
			$(addProductForm).prepend('<div class="alert alert-success">Product added successfully.</div>');
			window.location.href = '/products.html';
		},
		error => console.log('error: ', error)
	);

	e.preventDefault();
});
/* ############ End Add product Form ###################### */


/* ############ Category Form ###################### */

$("#save-category-button").click((e) => {
	const itemCategory = $("#itemCategory").val();

	const category = {
		itemCategory: itemCategory,
	};

	promise = $.post(mockUrl + "jcategories", category);

	promise.then(
		() => {
			clearAddCategoryForm();
			$(addCategoryForm).prepend('<div class="alert alert-success">Category added successfully.</div>');
			
		},
		error => console.log('error: ', error)
	);

	e.preventDefault();

});
/* ############ End save category Form ###################### */

/** Function to get the list of items */

const getProducts = () => {
	promise = $.get(mockUrl + "jproducts");
	promise.then(
		(data) => {
  		var html = '';
  		$.each(data, function(key,value){
			html +='<tr id="item">';
			html +='<td>'+ value.id + '</td>';
			html +='<td>'+ value.productName + '</td>';
			html +='<td>'+ value.categoryName + '</td>';
			html +='<td>'+ value.productDescription + '</td>';
			html +='<td>'+ value.price + '</td>';
			html +='<td>'+ value.status + '</td>';
			html +='<td class="text-center">'+ '<button class="btn btn-primary" id="edit-button">' + 'Edit'+ '</button>' + '&nbsp'+
							'<button class="btn btn-danger" id="delete-button" >' + 'Delete'+ '</button>' + '</td>';
			html +='</tr>';
  		});
		$('#table-products tbody').html(html);
		},
		error => console.log('error: ', error)


	);
	
};

/** End of get the list of items function*/

/** Function to get the category */

const getCategories = () => {
	promise = $.get(mockUrl + "jcategories");
	promise.then(
		(data) => {
  		var html = '';
  		$.each(data, function(key,value){
		
			html +='<option id="itemCategory" value= "' + value.itemCategory + '";>'+ value.itemCategory+'</option>';
			
  		});
		$('#category-name').html(html);
		},
		error => console.log('error: ', error)

	);
	
};

/** End of get the list of items function*/

/** Function to get the videos */

const getVideos = () => {
	promise = $.get(mockUrl + "jvideos");
	promise.then(
		(data) => {
  		var html = '';
  		$.each(data, function(key,value){
			html +='<tr id="item">';
			html +='<td>'+ value.title + '</td>';
			html +='<td>'+ value.runningTime + '</td>';
			html +='<td>'+ value.genre + '</td>';
			html +='<td>'+ value.rating + '</td>';
			html +='<td>'+ value.director + '</td>';
			html +='<td>'+ value.status + '</td>';
			html +='<td class="text-center">'+ '<button class="btn btn-primary" id="edit-button">' + 'Edit'+ '</button>' + '&nbsp'+
							'<button class="btn btn-danger" id="delete-button" >' + 'Delete'+ '</button>' + '</td>';
			html +='</tr>';
  		});
		$('#table-video tbody').html(html);
		},
		error => console.log('error: ', error)
	);
};

/** End of get video function*/

/* ############ Start Add video Form ###################### */
$("#add-video-button").click((e) => {
	const title = $("#title").val();
	const runningTime = $("#runningTime").val();
	const genre= $("#genre").val();
	const rating = $("#rating").val();
	const director = $("#director").val();
	const status = $("#status").val();
	
	const video = {
		title: title,
		runningTime: runningTime,
		genre: genre,
		rating: rating,
		director: director,
		status: status
	};

	promise = $.post(mockUrl + "jvideos", video);

	promise.then(
		() => {
			window.location.href = '/video.html';
		},
		error => console.log('error: ', error)
	);
	e.preventDefault();
});
/* ############ End Add video Form ###################### */


$(".to-products-btn").click((e) => {
	window.location.href = '/products.html';
	e.preventDefault();
});



$(".to-videos-btn").click((e) => {
	window.location.href = '/video.html';
	e.preventDefault();
});


/** Delete */
function Delete(){
    var par = $(this).parent(); //tr
    par.remove();
}; 

$("#delete-button").click((e) => {
	alert('delete btn');
	
});
/**End Delete  */


/** Function to get the list of items */

const getUsername = () => {
	promise = $.get(mockUrl + "jusers");
	promise.then(
		(data) => {
  		var html = '';
  		$.each(data, function(key,value){
			html += '<p>'+ value.userName + '</p>';
  		});
		$('#demo').html(html);
		},
		error => console.log('error: ', error)

	);
	
};

/** End of get the list of items function*/
getUsername();

getProducts();

getVideos();

getCategories();