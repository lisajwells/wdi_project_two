var categories = [{"id":1,"name":"mariachis"},{"id":2,"name":"diablos"},{"id":3,"name":"amigos"}];
var category_id;
var	allContacts = [];

// this is for onLoad
$(function(){

///// view for initial page load
// get names from db and build lists

function getNamesCategory(category) {
		for (c = 0; c < categories.length; c++){
			if (category == categories[c]["name"]) {
			category_id = categories[c]["id"];		
			}
		}

	$.ajax({
		url: '/categories/' + category_id,
		type: 'GET'
	}).done(function(data){

		var contacts = data["contacts"];
		var $ul = $("#" + category + "_ul");
		
		for (i = 0; i < contacts.length; i++) {
			var contactName = contacts[i]["name"];

			$ul.append("<li class='linkContact'><a href='#'><span class='glyphicon glyphicon-star'></span> " + contactName + "</a></li>");
		}
	})
};

getNamesCategory("mariachis");
getNamesCategory("diablos");
getNamesCategory("amigos");
/////


// event listener for <li>s to trigger contact view

$( ".contact_list" ).on( "click", "a", function( event ) {
    event.preventDefault();
    contactName = $( this ).text() ;
		return contactName;

		//call the function that finds the contact and displays its info
		displayContact(contactName);
});

function displayContact(contactName) {
//*** call the server and get allContacts
	$.ajax({
		url: '/contacts', 
		type: 'GET'
	}).done(function(data){

	//*** with the response data, iterate and find contactName
		allContacts = data; 

		for (x = 0; x < allContacts.length; x++){
			if (contactName == allContacts[x]["name"]) {

				// var id = allContacts[x]["id"];
				// var name = allContacts[x]["name"];
				var age = allContacts[x]["age"];
				var address = allContacts[x]["address"];
				var phone = allContacts[x]["phone_number"];
				var pic = allContacts[x]["picture"];

// find the category name given the category id
				var categoryId = allContacts[x]["category_id"];
				for (i = 0; i < categories.length; i++) {
					if (categoryId == categories[i]["id"]) { // categories[x] is undefined
						var category = categories[i]["name"];
					}
				$('#contact_hed').text(contactName);
				$('#contact_category').text(category);

				$('#contact_age').text(age);
				$('#contact_address').text(address);
				$('#contact_phone').text(phone);
				}
			}
		}
// fill the contact_view div with the contact info and make visible

	})
// make the index_view div hidden

};

// test call
displayContact('Jose Blose');

//

///// to create a new contact and add to category list of names

	var createContactButton = $('#createContactButton');

	createContactButton.on("click", function(e){
		e.preventDefault();
		var category = $('#newContactDropdown').val();
		for (c = 0; c < categories.length; c++){
			if (category == categories[c]["name"]) {
			category_id = categories[c]["id"];		
			}}
		var	$ul = $("#" + category + "_ul");
		var name = $('#newNameInput').val();
		var age = $('#newAgeInput').val();
		var address = $('#newAddressInput').val();
		var phone_number = $('#newPhoneInput').val();
		var picture = $('#newPicInput').val();

		// don't create the contact unless it's right
		validateForm();
		if (isValid == false) {
			alert('Please fill out all the fields');
		}
		else {

		$.ajax({
			url: '/contacts',
			type: 'POST',
			data:{
				name: name,
				age: age,
				address: address,
				phone_number: phone_number,
				picture: picture,
				category_id: category_id
			}
		}).done(function(data){

			$ul.append("<li class='linkContact'><a href='#'><span class='glyphicon glyphicon-star'></span> " + data["name"] + "</a></li>");

		})
		}
	});
/////

	function getRandomPic(picture) {
		$.ajax({
		  url: 'http://api.randomuser.me/',
		  dataType: 'json',
		  success: function(data){
		    // console.log(data);
		    picture = data["results"][0]["user"]["picture"]["thumbnail"];
		  return picture;
		  console.log(picture + ' is pic')
		  }
		})
	};
// how to get a random thumbnail
// data["results"][0]["user"]["picture"]["thumbnail"]



// check new contact form for empty fields
// ideally form should have 
// 1)x no empty fields for name, age, address, phone
// 2)x dropdown must have value other than "select a cat"
// *** 3) picture will populate with random user if empty

	function validateForm(picture) {
		// this function will return whether a form 
		// isValid, use it in a test to see whether or not 
		// to add a contact to the db  
		var picture = $('#newPicInput').val();
		var inputs = document.querySelectorAll(".newFormRequired");
		isValid = true; 
		notEmpty = true;
		categorySelected = true;
		
		// to check that required fields are not empty
		for(var i=0; i < inputs.length; i++) {
	  	var input = inputs[i];
	  	if ( input.value === '' ) {
	  		notEmpty = false; 
	  	}
	  }

	  // to check that "select" has chosen category
	  var dropdown = $('#newContactDropdown');
	  if (dropdown.val() == "Select category") {
	  	categorySelected = false;
	  }

	  // to get a random picture if none given
	  if ($('#newPicInput').val() === '') {
	  	console.log('pic is empty');
	  	getRandomPic(picture);
	  }

	  // to return value used to determine whether to create new contact
	  if (notEmpty == false || categorySelected == false) {
	  	isValid = false;
	  }
	  return isValid; 
	}



// this is the end of the onLoad
});
