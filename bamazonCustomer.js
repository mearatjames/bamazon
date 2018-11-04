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

let itemList = []

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
             itemList.push('Item ID: ' + res[i].item_id + ", " + res[i].product_name)
            }
        purchasePrompt(itemList)
    })
}

function purchasePrompt(itemList) {

    inquirer
    .prompt([{
      name: "item",
      type: "list",
      message: "Which item would you like to purchase",
      choices: itemList
    },{
        name: "quantity",
        type: "input",
        validate: validateNumber,
        filter: Number,
        message: "Please enter the quantity",
      }]
    )
    .then(function(answer) {
        let id = answer.item.match(/^Item ID: (\d+)/)[1]
        console.log(id)
        console.log(answer.quantity)
        placeOrder(id, answer.quantity)
    })
}

function placeOrder(id, quantity) {
    connection.query('SELECT * FROM products WHERE ?', {item_id: id}, function(err, res) {
        if (err) throw err
        if(quantity > res[0].stock_quantity) {
            console.log('Insufficient quantity!!')
        } else {
            let newQty = res[0].stock_quantity - quantity
            connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newQty}, {item_id: id}], function(err, res) {
                if (err) throw err
                console.log('Order placed!!')
            })
            // console.log('Placing the order...')
        }
        console.log(res[0])
    })
}

function validateNumber(val) {
    if(Number.isInteger(parseFloat(val)) == true && Math.sign(val) == 1) {
        return true
    } else {
        return 'Invalid quantity input!!'
    }  
}