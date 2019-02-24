const mysql = require("mysql");
const inquirer = require("inquirer");

//Creating a connection to bamazon_db
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

let itemList = []

function appStart() {
    //Displaying all current products inventory
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
            //Pushing item id and product name to itemList array for the prompt list
             itemList.push('Item ID: ' + res[i].item_id + ", " + res[i].product_name)
            }
        purchasePrompt(itemList)
    })
}

function purchasePrompt(itemList) {
//Prompt user to select the item from the list
    inquirer
    .prompt([{
      name: "item",
      type: "list",
      message: "Which item would you like to purchase",
      choices: itemList
    },{
    //Prompt user to input the quantity
        name: "quantity",
        type: "input",
        validate: validateNumber,
        filter: Number,
        message: "Please enter the quantity",
      }]
    )
    .then(function(answer) {
    //Using regex to extract id from the string
        let id = answer.item.match(/^Item ID: (\d+)/)[1]
        placeOrder(id, answer.quantity)
    })
}

function placeOrder(id, quantity) {
    //Querying the selected item based on the item_id
    connection.query('SELECT * FROM products WHERE ?', {item_id: id}, function(err, res) {
        if (err) throw err
        if(quantity > res[0].stock_quantity) {
            console.log('Insufficient quantity!!')
            homeInquirer()
        } else {
            let newQty = res[0].stock_quantity - quantity
            //Updating the quantity after the order is placed
            connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newQty}, {item_id: id}], function(err, res) {
                if (err) throw err
                console.log('Order placed!!')
                homeInquirer()
            })
        }
    })
}

//Validating the quantity input to accept positive integer only
function validateNumber(val) {
    if(Number.isInteger(parseFloat(val)) == true && Math.sign(val) == 1) {
        return true
    } else {
        return 'Invalid quantity input!!'
    }  
}

//Prompt for go back to home screen or exit the app
function homeInquirer() {
    inquirer
    .prompt({
      name: "home",
      type: "list",
      message: "Would you like to go back to home screen?",
      choices: ['Yes', "No, exit the app!"]
    })
    .then(function(answer) {
        if(answer.home === 'Yes') {
            appStart()
        } else {
           process.exit() 
        }
    })
}