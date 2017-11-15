DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Dictionary", "Books", 10.99, 100)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Computer Programming Textbook, Volume 1", "Books", 11.99, 50)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Computer Programming Textbook, Volume 2", "Books", 11.99, 50)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Computer Programming Textbook, Volume 3", "Books", 11.99, 50)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Smartphone", "Electronics", 300.99, 100)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Laptop", "Electronics", 1000.99, 150)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Desktop Computer", "Electronics", 2000.99, 120)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Cat Food", "Pet Supplies", 29.99, 200)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Human Food", "Groceries", 80.99, 300)

INSERT INTO products (product_name, department_name, price stock_quantity)
VALUES ("Pens (One Box)", "Office Supplies", 6.99, 150)