//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName,siteURL)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        URL: siteURL
    }


    //test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        //add to array;
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //JSON.stringify turns into string
    } else {
        //get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //JSON.parse turns it into JSON

        //add bookmark to array
        bookmarks.push(bookmark);
        //reset each to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
//clear form 
document.getElementById('myForm').reset();

//re-fetch bookmarks
fetchBookmarks();

//prevent form from submitting
e.preventDefault();
}

//delete bookmark
function deleteBookmark(URL){
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].URL == URL){
            //remove from array
            bookmarks.splice(i,1);

        }
    }

    //re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var URL = bookmarks[i].URL;

        bookmarksResults.innerHTML += '<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-default" target="_blank" href="'+addhttp(URL)+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+URL+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+
        '</div>';
    }
}

// Validate Form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteURL.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(URL) {
    if (!/^(?:f|ht)tps?\:\/\//.test(URL)) {
        URL = "http://" + URL;
    }
    return URL;
  }