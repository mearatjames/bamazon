# bamazon
## CLI APP (Using NODE JS, MySQL, and Inquirer npm packages)

## Description

This is a CLI Application of the Amazon-like storefront. The app will take in orders from customers and deplete stock from the store's inventory. 

## Initial Setup

This application requires the mySQL installed and setup to host the database via the localhost. Please visit [www.mysql.com](https://www.mysql.com/) and download/install mysql community server and workbench.
Once MySQL is installed, run the [bamazon.sql](https://github.com/mearatjames/bamazon/blob/dev/bamazon.sql) to create the initial database.

Please note that NODE JS is required to run this CLI app. Visit [NODE JS](https://nodejs.org/en/) to learn more.

## How The App Works

- When the user run bamazonCustomer.js via NODE inside the CLI, the list of current inventory will be displayed. 
- The user will be prompted to select one of the item from the list to make the purchase. 
- After the item is selected, a prompt for quantity input is shown.
- If the input quantity is greater than available quantity, the "Insufficient Quantity!!" message will appear. Otherwise, the "Order placed!!" message will appear instead.
- User will then be asked to either exit the application or go back to the main page.

## App demo


