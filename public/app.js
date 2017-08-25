  $(".modal").hide();


$(document).on("click", "#scrape", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .done(function(data){
    console.log(data);
  });
});


$(document).on("click", "#noteBtn", function() {
  // Empty the notes from the note section
  $(".modal").empty();
  $(".modal").show();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/notes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      // var x = data.toString();
      console.log('data:  ' + data);
      $(".modal").append('<h3 class="notesTitle">'  + data.title + "</h3>");

      if (data.notes) {
        for(let i = 0; i < data.notes.length; i++) { 
        var newWell = $('<div class="noteWell"></div>');
        newWell.append('<h5 class="noteTitle">Title: '  + data.notes[i].title + "</h5>" );
        newWell.append('<h5 class="noteAuthor">Author: '  + data.notes[i].author + "</h5>" );        
        newWell.append('<h5 class="noteBody">' + data.notes[i].body + "</h5>" );
        $('.modal').append(newWell);
        }      
      }
      // The title of the article
      // An input to enter a new title
      var addNote = $('<div class="addNote"></div>');
      addNote.append('<p class="titleInput">Title</p><input id="titleinput" name="title" ><br>' );
      addNote.append('<p class="authorInput">Author</p><input id="authorinput" name="author" ><br>' );

      // A textarea to add a new note body
      addNote.append('<p class="bodyInputLabel">Note</p><textarea id="bodyinput" name="body"></textarea>' );
      // A button to submit a new note, with the id of the article saved to it
      addNote.append('<br><br><button data-id="'  + data._id + '"id="savenote">Save Note</button>');
      addNote.append('<button data-id="'  + data._id + '"id="exit">Exit</button>');

      $('.modal').append(addNote);

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
      $(".modal").empty();
      $(".modal").hide();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  $("#authorinput").val("");

});

$(document).on("click", "#exit", function() {
  $('.modal').empty().hide();
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