const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  appStart();
});

function appStart() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log('Current Inventory: \n');
		for (let i = 0; i < res.length; i++) {
            console.log(
            'Item ID: ' + res[i].item_id + '\n' +
            'Product Name: ' + res[i].product_name + '\n' +
			'Department: ' + res[i].department_name + '\n' +
            'Price: $' + res[i].price + '\n' +
            '---------------------------------------------\n'
            )
		}
      })
}
