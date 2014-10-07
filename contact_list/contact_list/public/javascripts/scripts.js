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

			// we need the contact obj id's in the db so that... 
			var contactId = contacts[i]["id"]; 

											// we can add it to the li as a DOM id so  
											// when we go to delete it in the contact view 
			$ul.append("<li class='linkContact' id=" + contactId  + 
				"><a href='#'><span class='glyphicon glyphicon-star'></span>" + contactName + "</a></li>");
		}
	})
};

getNamesCategory("mariachis");
getNamesCategory("diablos");
getNamesCategory("amigos");
/////


///// to edit a contact, put it to the db, and display the contact view with the edited content

// call this in the event listener around line 99

function editContact(contactName, category, age, address, phone){
 	$('div.contact_view').addClass('noshow');
 	$('div.edit_view').removeClass('noshow');

		$('#edit_contact_hed').text(contactName);
		$('#edit_contact_category').text(category);
		// $('#edit_contact_pic').html("<img class='small center' src='" + pic + "'>");
		$('#edit_contact_age').html("<b>age: </b>" + age);
		$('#edit_contact_address').html("<b>address: </b>" + address);
		$('#edit_contact_phone').html("<b>phone: </b>" + phone);
			
}

function displayContact(contactName) {	
	// call the server and get allContacts
	$.ajax({
		url: '/contacts', 
		type: 'GET'
	}).done(function(data){

	// with the response data, iterate and find contactName
		allContacts = data; 

		for (var x = 0; x < allContacts.length; x++){
			if (contactName == allContacts[x]["name"]) {
				var contactId = allContacts[x]["id"]; 
				// the contact view also needs an id 
				// so we can send the delete request to the server 
				$('div.contact_view').attr("id", contactId);

				var age = allContacts[x]["age"];
				var address = allContacts[x]["address"];
				var phone = allContacts[x]["phone_number"];
				var pic = allContacts[x]["picture"];

	// find the category name given the category id
				var categoryId = allContacts[x]["category_id"];
				for (i = 0; i < categories.length; i++) {
					if (categoryId == categories[i]["id"]) { 
						var category = categories[i]["name"];
					}

	// fill the contact_view div with the contact info
				$('#contact_hed').text(contactName);
				$('#contact_category').text(category);
				$('#contact_pic').html("<img class='small center' src='" + pic + "'>");
				}
				$('#contact_age').html("<b>age: </b>" + age);
				$('#contact_address').html("<b>address: </b>" + address);
				$('#contact_phone').html("<b>phone: </b>" + phone);
			}
		}
	})

// make the index_view div hidden and the contact_view div visible
 	$('div.contact_view').removeClass('noshow');
 	$('div.index_view').addClass('noshow');

// put event listener here for edit button
var editContactButton = $('#edit_contact_btn');

editContactButton.on("click", function(e){
	e.preventDefault();

	console.log('edit button is happening')
	editContact(contactName, category, age, address, phone);
})

};






// event listener for <li>s to trigger contact view

$( ".contact_list" ).on( "click", "a", function( event ) {
    event.preventDefault();
    var contactName = $( this ).text() ;
    console.log(contactName);
    // console.log(typeof contactName);
		// return contactName;

		//call the function that finds the contact and displays its info
		displayContact(contactName);
});
//


// click to populate picture url field with random pic		
	var randomButton = $('#random_button');
		randomButton.on("click", function(e){
		e.preventDefault();

		$.ajax({
		  url: 'http://api.randomuser.me/',
		  dataType: 'json',
		  success: function(data){

		    var picture = data["results"][0]["user"]["picture"]["thumbnail"];
		    var pictureInput = $('#newPicInput');

		  	//add it to the dom here
		    pictureInput.val(picture);
		  	console.log(picture);
		  }
		})
	});


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
		var isValid = validateForm();
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
			
			$ul.append("<li class='linkContact'><a href='#'><span class='glyphicon glyphicon-star'></span>" + data["name"] + "</a></li>");

		})
		}
		$('#newNameInput').val('');
		$('#newAgeInput').val('');
		$('#newAddressInput').val('');
		$('#newPhoneInput').val('');
		$('#newPicInput').val('');
		$('#newContactDropdown').val('Select category');

	});
/////

///// button to go back to index view from contact view
	var contactExitButton = $('#exit_contact_btn');

	contactExitButton.on("click", function(e){
		e.preventDefault();

		// make the contact_view div hidden and the index_view div visible
	 	$('div.contact_view').addClass('noshow');
	 	$('div.index_view').removeClass('noshow');

	});


///// button to delete a contact
	var contactDeleteButton = $('#delete_contact_btn');

	contactDeleteButton.on("click", function(e){
		// do you really need this? Try commenting out. 
		// if so, why? --by Clayton
		e.preventDefault();

		/// get the contact id Clayton embedded in 
		// the contact_view div as the div's id 
		var contactId = e.currentTarget.parentNode.parentNode.parentNode.id;	

		// remove the list item corresponding to the contact we're going to delete 
		$("li#" + contactId).remove();  

		// reload the list categories view 
		$('div.contact_view').addClass('noshow');
	 	$('div.index_view').removeClass('noshow');

	 	// send a delete request to the server, 
	 	// using the id of the user 
		$.ajax({
			url: "/contacts/" + contactId,
			method: 'DELETE'
		})
	});


///// form validation

	function validateForm(picture) {
		// this function will return whether a form 
		// isValid, use it in a test to see whether or not 
		// to add a contact to the db  
		var picture = $('#newPicInput').val();
		var inputs = document.querySelectorAll(".newFormRequired");
		var isValid = true; 
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

	  // to return value used to determine whether to create new contact
	  if (notEmpty == false || categorySelected == false) {
	  	isValid = false;
	  }
	  return isValid; 
	}



// this is the end of the onLoad
});
