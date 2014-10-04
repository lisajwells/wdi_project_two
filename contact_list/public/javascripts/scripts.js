// var allContacts = [{"id":8,"name":"Teodoro","age":62,"address":"Plazuela del Carmen Alto, Oaxaca, Oaxaca","phone_number":"678-456-7890","picture":"","category_id":1},{"id":6,"name":"Pepe","age":46,"address":"20 de Noviembre, Guanajuato, Morelia","phone_number":"666-456-6660","picture":"","category_id":2},{"id":7,"name":"Dona Estela","age":63,"address":"La Hacienda, Tlaxcala, Tlaxcala","phone_number":"453-555-7890","picture":"","category_id":3},{"id":4,"name":"Jose","age":33,"address":"42 Agua, Oaxaca, Oaxaca","phone_number":"123-555-7890","picture":"","category_id":1},{"id":9,"name":"Esperanze","age":26,"address":"6 de Diciembre 34, Morelia, Michuacan","phone_number":"666-776-8660","picture":"","category_id":2},{"id":5,"name":"Guadalupe","age":12,"address":"Benito Juarez 145, San Cristobal, Chiapas","phone_number":"123-456-7890","picture":"","category_id":3}];
// var allCategories = [{"id":1,"name":"mariachis"},{"id":2,"name":"diablos"},{"id":3,"name":"amigos"}];
// var mariachis = [{"id":8,"name":"Teodoro","age":62,"address":"Plazuela del Carmen Alto, Oaxaca, Oaxaca","phone_number":"678-456-7890","picture":"","category_id":1},{"id":4,"name":"Jose","age":33,"address":"42 Agua, Oaxaca, Oaxaca","phone_number":"123-555-7890","picture":"","category_id":1}];
// var diablos = [{"id":6,"name":"Pepe","age":46,"address":"20 de Noviembre, Guanajuato, Morelia","phone_number":"666-456-6660","picture":"","category_id":2},{"id":9,"name":"Esperanze","age":26,"address":"6 de Diciembre 34, Morelia, Michuacan","phone_number":"666-776-8660","picture":"","category_id":2}];
// var amigos = [{"id":7,"name":"Dona Estela","age":63,"address":"La Hacienda, Tlaxcala, Tlaxcala","phone_number":"453-555-7890","picture":"","category_id":3},{"id":5,"name":"Guadalupe","age":12,"address":"Benito Juarez 145, San Cristobal, Chiapas","phone_number":"123-456-7890","picture":"","category_id":3}];
var categories = [{"id":1,"name":"mariachis"},{"id":2,"name":"diablos"},{"id":3,"name":"amigos"}];
var category_id;

$(function(){

// for initial page load
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
	$('#createContactButton').on("click", function(e){
		e.preventDefault();
		var category = $('#newContactDropdown').val();
		var	$ul = $("#" + category + "_ul");
		var contactName = $('#newNameInput').val();
		console.log(contactName);
		$ul.append("<li>adfsdfsadfsdfasf</li>")
		// $ul.append("<li><span class='glyphicon glyphicon-star'></span> " + contactName + "</li>");
	})





/////




// function getContact() {
// 	$.ajax({
// 		url: 'contacts/:id',
// 		type: 'GET'
// 	})
// }






//// this is the end of onLoad
});
