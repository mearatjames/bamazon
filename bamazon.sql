DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL (10, 2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)  VALUES
	('Amazon Echo', 'Electronics', 79.00, 20), 
    ('Sony A7 III Mirror Less Camera', 'Electronics', 1998.00, 5), 
    ('1984 by George Orwell', 'Books', 17.06, 15),
    ('The Old Man And The Sea by Earnest Hemmingway', 'Books', 9.92, 10),
    ('Kenmore 50049 25 cu. ft. Side-by-Side Refrigerator', 'Appliances', 899.99, 2),
    ('Post-it Notes 3x3 in, 12pads 100sheets/pad', 'Office Prodcuts', 9.99, 100),
    ("Calvin Klein Men's Merino Sweater V Neck", 'Clothing', 23.69, 8),
    ("adidas Men's Ultraboost Road Running Shoe", 'Clothing', 120.48, 11),
    ('Samsung T5 Portable SSD - 250GB - USB 3.1 ', 'Electronics', 99.00, 10),
    ('iRobot Roomba 801 Robotic Vacuum', 'Appliances', 349.00, 4);
