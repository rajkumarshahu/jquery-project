import $ from "jquery";

const mockUrl = "http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/";
const addCategoryForm = $("#add-category-form");
const addProductForm = $("#add-product-form");

let promise = null;

const clearAddForm = () => {
    $(":input", addProductForm).val("");
  };

  const clearAddCategoryForm = () => {
    $(":input", addCategoryForm).val("");
  };

/* ############ Start Add product Form ###################### */
$("#add-product-button").click(e => {
    const productName = $("#product-name").val();
    const categoryName = $("#category-name").val();
    const productDescription = $("#product-description").val();
    const price = $("#price").val();
    const status = $("#status").val();

    const product = {
      productName: productName,
      productDescription: productDescription,
      categoryName: categoryName,
      price: price,
      status: status,
    };

    promise = $.post(mockUrl + "jproducts", product);

    promise.then(
      () => {
        clearAddForm();
        $(addProductForm).prepend(
          '<div class="alert alert-success">Product added successfully.</div>'
        );
        window.location.href = "/products.html";
      },
      error => console.log("error: ", error)
    );

    e.preventDefault();
  });
  /* ############ End Add product Form ###################### */

 /* ############ Category Form ###################### */

 $("#save-category-button").click(e => {
    const itemCategory = $("#itemCategory").val();

    const category = {
      itemCategory: itemCategory,
    };

    promise = $.post(mockUrl + "jcategories", category);

    promise.then(
      () => {
        clearAddCategoryForm();
        $(addCategoryForm).prepend(
          '<div class="alert alert-success">Category added successfully.</div>'
        );
      },
      error => console.log("error: ", error)
    );

    e.preventDefault();
  });
  /* ############ End save category Form ###################### */

  /** Function to get the category */

const getCategories = () => {
    promise = $.get(mockUrl + "jcategories");
    promise.then(
      data => {
        var html = "";
        $.each(data, function(key, value) {
          html +=
            '<option id="itemCategory" value= "' +
            value.itemCategory +
            '";>' +
            value.itemCategory +
            "</option>";
        });
        $("#category-name").html(html);
      },
      error => console.log("error: ", error)
    );
  };

  /** End of get the list of items function*/

  $(".to-products-btn").click(e => {
    window.location.href = "/products.html";
    e.preventDefault();
  });

  $(".to-videos-btn").click(e => {
    window.location.href = "/video.html";
    e.preventDefault();
  });

  getCategories();