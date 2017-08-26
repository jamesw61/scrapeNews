 function getNotes(thisId) {
  $.ajax({
             method: "GET",
             url: "/notes/" + thisId
         })
         .done(function(data) {
             
             $(".modal").empty();
             $(".modal").show();
             $(".modal").append('<h3 class="notesTitle">' + data.title + "</h3>");

             if (data.notes) {
                 for (let i = 0; i < data.notes.length; i++) {
                     var newWell = $('<div class="noteWell" id="' + data.notes[i]._id + '"></div>');
                     newWell.append('<h5 class="noteTitle">Title: ' + data.notes[i].title + "</h5>");
                     newWell.append('<h5 class="noteAuthor">Author: ' + data.notes[i].author + "</h5>");
                     newWell.append('<h5 class="noteBody">' + data.notes[i].body + "</h5>");
                     newWell.append('<button art-id="' + thisId + '" data-id="' + data.notes[i]._id + '" id="removeNote">Remove</button>');
                     $('.modal').append(newWell);
                 }
             }
             var addNote = $('<div class="addNote"></div>');
             addNote.append('<p class="titleInput">Title</p><input id="titleinput" name="title" ><br>');
             addNote.append('<p class="authorInput">Author</p><input id="authorinput" name="author" ><br>');

             addNote.append('<p class="bodyInputLabel">Note</p><textarea id="bodyinput" name="body"></textarea>');
             addNote.append('<br><br><button data-id="' + data._id + '"id="savenote">Save Note</button>');
             addNote.append('<button data-id="' + data._id + '"id="exit">Exit</button>');

             $('.modal').append(addNote);

         });
 }
 //hide the note modal
 $(".modal").hide();

 //Scrape button 
 $(document).on("click", "#scrape", function() {
     $.ajax({
             method: "GET",
             url: "/scrape"
         })
         .done(function(data) {
             console.log(data);
         });
 });

 //Notes button gets the notes and/or creates an input for new note 
 //and adds them to the modal and diplays the modal
 $(document).on("click", "#noteBtn", function() {

     var thisId = $(this).attr("data-id");
     getNotes(thisId);

 });

//Remove button on note modal removes note from mongo but
//I can't get the getNotes function to reload the notes.
 $(document).on("click", "#removeNote", function() {
     var thisId = $(this).attr("data-id");
     var artId = $(this).attr("art-id");
     
     $.ajax({
             method: "POST",
             url: "notes/delete/" + thisId,
             data: {
                 artId: artId
             }
         })
         .done(function(data) {
             // console.log(data);
             //why doesn't this work?
             //can't get artId or thisId
             console.log("thisId  " + thisId);
             getNotes(artId);
             console.log("artId" + artId);
             
         });
 });

 //Save Note button on the modal sends note to Mongo
 $(document).on("click", "#savenote", function() {
     var thisId = $(this).attr("data-id");
     console.log(thisId);

     $.ajax({
             method: "POST",
             url: "/notes/" + thisId,
             data: {
                 title: $("#titleinput").val(),
                 author: $("#authorinput").val(),
                 body: $("#bodyinput").val()
             }
         })
         .done(function(data) {
             // console.log(data);
             //this works here but not in the removeNote function above
             getNotes(thisId);
             console.log(thisId);
         });

 });

 //Exit button on modal hides the note modal
 $(document).on("click", "#exit", function() {
     $('.modal').empty().hide();
 });