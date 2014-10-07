///// to edit a contact, put it to the db, and display the contact view with the edited content

// call this in the event listener around line 99

function editContact(){
 	$('div.contact_view').addClass('noshow');
 	$('div.edit_view').removeClass('noshow');

				$('#contact_hed').text(contactName);
				$('#contact_category').text(category);
				$('#contact_pic').html("<img class='small center' src='" + pic + "'>");
				$('#contact_age').html("<b>age: </b>" + age);
				$('#contact_address').html("<b>address: </b>" + address);
				$('#contact_phone').html("<b>phone: </b>" + phone);
			
}