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
	purchase();
	
});

function displayStock() {
	
	connection.query("SELECT * FROM products", function(err, results) {

		if (err) throw err;

		for (var i = 0; i < results.length; i++) {
      		console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
      	}

	})
}

function purchase() {
	
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

			connection.query(
				"SELECT * FROM products WHERE item_id", [answer.product_id],
			)

			connection.query(
				"UPDATE products SET ? WHERE ?",
				[
					{
						// stock_quantity: stock_quantity - answer.product_amount
					}
				]
			)

		})
}