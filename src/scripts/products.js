import $ from "jquery";

const mockUrl = "http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/";
const addCategoryForm = $("#add-category-form");
let promise = null;



  /** Function to get the list of items */

const getProducts = () => {
    promise = $.get(mockUrl + "jproducts");
    promise.then(
      data => {
        var html = "";
        $.each(data, function(key, value) {
          html += '<tr id="item">';
          html += "<td>" + value.id + "</td>";
          html += "<td>" + value.productName + "</td>";
          html += "<td>" + value.categoryName + "</td>";
          html += "<td>" + value.productDescription + "</td>";
          html += "<td>" + value.price + "</td>";
          html += "<td>" + value.status + "</td>";
          html +=
            '<td class="text-center">' +
            '<button class="btn btn-primary" id="edit-button">' +
            "Edit" +
            "</button>" +
            "&nbsp" +
            '<button class="btn btn-danger" id="delete-button" onclick="deleteRow(this)" >' +
            "Delete" +
            "</button>" +
            "</td>";
          html += "</tr>";
        });
        $("#table-products tbody").html(html);
      },
      error => console.log("error: ", error)
    );
  };

  /** End of get the list of items function*/


  /** Function to get the list of items by price */

const getProductsByPrice = () => {
    promise = $.get(mockUrl + "jproducts");
    promise.then(
      data => {
          input1 = $("#Input1").val();
          input2 = $("#Input2").val();
          minPrice = parseInt(input1);
          maxPrice = parseInt(input2);
          let findPriceData = data.filter((d)=>{
              return d.price >= minPrice && d.price <= maxPrice;
          }).
          sort((a, b) => {
              return a.price - b.price;
          });


          console.log(findPriceData);
        var html = "";
        var input1, input2, minPrice, maxPrice;

        $("#table-products tbody").html(html);

        findPriceData.forEach((value)=>{
          html += '<tr id="item">';
          html += "<td>" + value.id + "</td>";
          html += "<td>" + value.productName + "</td>";
          html += "<td>" + value.categoryName + "</td>";
          html += "<td>" + value.productDescription + "</td>";
          html += '<td id="price">' + value.price + "</td>";
          html += "<td>" + value.status + "</td>";
          html +=
            '<td class="text-center">' +
            '<button class="btn btn-primary" id="edit-button">' +
            "Edit" +
            "</button>" +
            "&nbsp" +
            '<button class="btn btn-danger" id="delete-button" onclick="deleteRow(this)" >' +
            "Delete" +
            "</button>" +
            "</td>";
          html += "</tr>";
        });


        $("#table-products tbody").html(html);
      },
      error => console.log("error: ", error)
    );
  };

  $("#search-by-price").click(e => {
    getProductsByPrice();
    e.preventDefault();
  });

  /** End of get the list of items function*/
  $(".to-products-btn").click(e => {
    window.location.href = "/products.html";
    e.preventDefault();
  });

  $(".to-videos-btn").click(e => {
    window.location.href = "/video.html";
    e.preventDefault();
  });

  function searchProduct() {
    // Declare variables
    var input, filter, table, tr, td1, td2, td3, i, txtValue1, txtValue2, txtValue3;
    input = document.getElementById("productInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-products");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[2];
      td3 = tr[i].getElementsByTagName("td")[3];
      if (td1 || td2 || td3) {
        txtValue1 = (td1.textContent || td1.innerText);
        txtValue2 = (td2.textContent || td2.innerText);
        txtValue3 = (td3.textContent || td3.innerText);
        if ((txtValue1.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1) || (txtValue3.toUpperCase().indexOf(filter) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

$("#productInput").keyup(e => {
  searchProduct();
  e.preventDefault();
});


  getProductsByPrice();

  getProducts();
