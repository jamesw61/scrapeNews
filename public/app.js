// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     $("#articles").append("<img src='" + data[i].image + "'>");
//   }
// });


// Whenever someone clicks a p tag
$(document).on("click", "#noteBtn", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/notes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      $("#notes").append("<h4>" + data.title + "</h4>");

      if (data.note) {
        // Place the title of the note in the title input
        $("#notes").append("<br><h5>Title: " + data.note.title + "</h5>" );
        $("#notes").append("<br><h5>Author: " + data.note.author + "</h5>" );        
        $("#notes").append('<h5 style="display: inline-block">Note: </h5><p style="display: inline-block">' + data.note.body + "</p>" );      
      }
      // The title of the article
      // An input to enter a new title
      $("#notes").append("<h5>Title</h5><input id='titleinput' name='title' ><br>");
      $("#notes").append("<h5>Author</h5><input id='authorinput' name='author' ><br>");

      // A textarea to add a new note body
      $("#notes").append("<h5>Note</h5><textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<br><button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      author: $("#authorinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#authorinput").val("");

});

// $(document).on("click", "#saveBtn", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");
//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/save/" + thisId,
//     data: thisId
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log("x" + data);
//       // Empty the notes section
      
//     });

//   // Also, remove the values entered in the input and textarea for note entry
 
// });