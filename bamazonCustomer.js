var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,

	user: "root",

	password: "1111",
	database: "bamazon"

});

connection.connect(function(err) {

	if (err) throw err;

	displayStock();
	
});

function displayStock() {
	
	connection.query("SELECT * FROM products", function(err, results) {

		if (err) throw err;

		for (var i = 0; i < results.length; i++) {
      		console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
      	}

	})

	purchase();
	
}

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
			.then(function(answer) {

				var selectedItem;
				var selectedAmount = parseInt(answer.product_amount);

				for (var i = 0; i < results.length; i++) {
					if (results[i].item_id === answer.product_id) {
			    		selectedItem = results[i];
			        }
				}

				if (selectedItem.stock_quantity < selectedAmount || selectedItem.stock_quantity === 0) {

					console.log("Sorry, we do not have enough of that item.")
					displayStock();

				} else {

					var purchaseID = selectedItem.item_id
					var newAmount = selectedItem.stock_quantity - selectedAmount

					connection.query(
			            "UPDATE purchase SET ? WHERE ?",
			            [
			              {
			                stock_quantity: newAmount
			              },
			              {
			                item_id: purchaseID
			              }
			            ],
			            function(error) {
			              if (error) throw err;

			              console.log("Thank you for your purchase!");
			              displayStock();
			            }
			        );

				}
			})
	})	
}