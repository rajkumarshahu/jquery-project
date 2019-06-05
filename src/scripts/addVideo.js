import $ from "jquery";

const mockUrl = "http://5cc75aa0ae1431001472e41b.mockapi.io/api/v1/";

let promise = null;

const clearAddForm = () => {
    $(":input", addProductForm).val("");
  };
  const clearAddGenreForm = () => {
    $(":input", addGenreForm).val("");
  };

/* ############ Start Add video Form ###################### */
$("#add-video-button").click(e => {
    const title = $("#title").val();
    const runningTime = $("#runningTime").val();
    const genre = $("#genre").val();
    const rating = $("#rating").val();
    const director = $("#director").val();
    const status = $("#status").val();

    const video = {
      title: title,
      runningTime: runningTime,
      genre: genre,
      rating: rating,
      director: director,
      status: status,
    };

    promise = $.post(mockUrl + "jvideos", video);

    promise.then(
      () => {
        window.location.href = "/video.html";
      },
      error => console.log("error: ", error)
    );
    e.preventDefault();
  });
  /* ############ End Add video Form ###################### */

  const getGenre = () => {
    promise = $.get(mockUrl + "jgenre");
    promise.then(
      data => {
        var html = "";
        $.each(data, function(key, value) {
          html +=
            '<option id="genreItem" value= "' +
            value.genre +
            '";>' +
            value.genre +
            "</option>";
        });
        $("#genre-name").html(html);
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

  getGenre();