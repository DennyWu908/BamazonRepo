// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// This variable contains the connection information for the sql database. When I installed sql, I created a password.
var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,

	user: "root",

	password: "1111",
	database: "bamazon"

});

// This function will create a connection to the sql database and mysql server.
connection.connect(function(err) {

	if (err) throw err;

	// When the connection is ready, the terminal will display the list of items on sale.
	displayStock();
	
});

// As noted above, this function iterates through the sql database and returns the list of items on sale.
function displayStock() {
	
	connection.query("SELECT * FROM products", function(err, results) {

		if (err) throw err;

		for (var i = 0; i < results.length; i++) {
      		console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
      	}

	})

	// After the list as been displayed, the user will be prompted to buy items.
	purchase();
	
}

// This function will allow the user to buy items with an inquirer dialogue.
function purchase() {

	connection.query("SELECT * FROM products", function(err, results) {
		
		if (err) throw err;

		inquirer
			.prompt([
				{
					name: "product_id",
			        type: "input",
			        message: "What is the ID of the product you want to buy?"
				},
				{
					name: "product_amount",
			        type: "input",
			        message: "How many units of this product do you want?"
				}
			])
			// Iterating through the database to find an item with an ID matching the one entered.
			.then(function(answer) {

				var selectedItem;
				var selectedAmount = parseInt(answer.product_amount);

				for (var i = 0; i < results.length; i++) {
					if (results[i].item_id === parseInt(answer.product_id)) {
			    		selectedItem = results[i];
			        }
				}

				// console.log(results)
				// console.log(typeof(answer.product_id))
				// console.log(selectedItem)

				// If the user asks for too many of a certain item, or it is no longer in stock, the program will return an error message. Then it will list the items for sale and repeat the inquirer prompt.
				if (selectedItem.stock_quantity < selectedAmount || selectedItem.stock_quantity === 0) {

					console.log("Sorry, we do not have enough of that item.")
					displayStock();

				// If the items asked for are in stock, the amounts purchased by the user will be subtracted from the total number, and the database will be updated accordingly. Afterwards, the inquirer prompt will be displayed again.
				} else {

					var purchaseID = selectedItem.item_id
					var newAmount = selectedItem.stock_quantity - selectedAmount

					connection.query(
			            "UPDATE products SET ? WHERE ?",
			            [
			              {
			                stock_quantity: newAmount
			              },
			              {
			                item_id: purchaseID
			              }
			            ],
			            function(err, results) {
			              if (err) throw err;

			              console.log("Thank you for your purchase!");
			              displayStock();
			            }
			        );

				}
			})
	})	
}