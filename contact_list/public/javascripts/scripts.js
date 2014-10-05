var categories = [{"id":1,"name":"mariachis"},{"id":2,"name":"diablos"},{"id":3,"name":"amigos"}];
var category_id;

// this is for onLoad
$(function(){

// view for initial page load
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
			$ul.append("<li><span class='glyphicon glyphicon-star'></span> " + contactName + "</li>");
		}
	})
};

getNamesCategory("mariachis");
getNamesCategory("diablos");
getNamesCategory("amigos");
/////


// to create a new contact and add to category list of names
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
			console.log(data);
			$ul.append("<li><span class='glyphicon glyphicon-star'></span> " + data["name"] + "</li>");
		})
		}
	});
/////
	function getRandomPic() {
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
// 1) no empty fields for name, age, address, phone
// 2) dropdown must have value other than "select a cat"
// 3) picture will populate with random user if empty

	function validateForm() {
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
	  	console.log(notEmpty + ' notEmpty')

	  // to check that "select" has chosen category
	  var dropdown = $('#newContactDropdown');
	  if (dropdown.val() == "Select category") {
	  	categorySelected = false;
	  }

	  // to get a random picture if none given
	  if ($('#newPicInput').val() === '') {
	  	getRandomPic();
	  }

	  // to return value used to determine whether to create new contact
	  if (notEmpty == false || categorySelected == false) {
	  	isValid = false;
	  }
	  return isValid; 
	}



// this is the end of the onLoad
});
