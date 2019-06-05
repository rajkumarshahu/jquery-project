import $ from "jquery";

const mockUrl = "http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/";

let promise = null;

/* ############ Genre Form ###################### */

$("#save-genre-button").click(e => {
    const genreItem = $("#genreItem").val();

    const genre = {
      genreItem: genreItem,
    };

    promise = $.post(mockUrl + "jgenre", genre);

    promise.then(
      () => {
        clearAddGenreForm();
        $(addGenreForm).prepend(
          '<div class="alert alert-success">Genre added successfully.</div>'
        );
      },
      error => console.log("error: ", error)
    );

    e.preventDefault();
  });
  /* ############ End save category Form ###################### */


  /** Function to get the videos */

  const getVideos = () => {
    promise = $.get(mockUrl + "jvideos");
    promise.then(
      data => {
        var html = "";
        $.each(data, function(key, value) {
          html += '<tr id="item">';
          html += "<td>" + value.title + "</td>";
          html += "<td>" + value.runningTime + "</td>";
          html += "<td>" + value.genre + "</td>";
          html += "<td>" + value.rating + "</td>";
          html += "<td>" + value.director + "</td>";
          html += "<td>" + value.status + "</td>";
          html +=
            '<td class="text-center">' +
            '<button class="btn btn-primary" id="edit-button">' +
            "Edit" +
            "</button>" +
            "&nbsp" +
            '<button class="btn btn-danger" id="delete-button" >' +
            "Delete" +
            "</button>" +
            "</td>";
          html += "</tr>";
        });
        $("#table-video tbody").html(html);
      },
      error => console.log("error: ", error)
    );
  };

  /** End of get video function*/

  function searchVideo() {
    // Declare variables
    var input, filter, table, tr, td1, td2, td3, td4, td5, td6, i, txtValue1,txtValue2, txtValue3, txtValue4, txtValue5, txtValue6;
    input = document.getElementById("videoInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-video");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[1];
      td3 = tr[i].getElementsByTagName("td")[2];
      td4 = tr[i].getElementsByTagName("td")[3];
      td5 = tr[i].getElementsByTagName("td")[4];
      td6 = tr[i].getElementsByTagName("td")[5];
      if (td1 || td2 || td3 || td4 || td5 || td6) {
        txtValue1 = (td1.textContent || td1.innerText);
        txtValue2 = (td2.textContent || td2.innerText);
        txtValue3 = (td3.textContent || td3.innerText);
        txtValue4 = (td4.textContent || td4.innerText);
        txtValue5 = (td5.textContent || td5.innerText);
        txtValue6 = (td6.textContent || td6.innerText);

        if ((txtValue1.toUpperCase().indexOf(filter) > -1) ||
        (txtValue2.toUpperCase().indexOf(filter) > -1) ||
        (txtValue3.toUpperCase().indexOf(filter) > -1) ||
        (txtValue4.toUpperCase().indexOf(filter) > -1) ||
        (txtValue5.toUpperCase().indexOf(filter) > -1) ||
        (txtValue6.toUpperCase().indexOf(filter) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


  $(".to-products-btn").click(e => {
    window.location.href = "/products.html";
    e.preventDefault();
  });

  $(".to-videos-btn").click(e => {
    window.location.href = "/video.html";
    e.preventDefault();
  });

  $("#videoInput").keyup(e => {
    searchVideo();
    e.preventDefault();
  });



  getVideos();
