DROP DATABASE IF EXISTS bamazon;
-- Creates the "favorite_db" database --
CREATE DATABASE bamazon;

USE bamazon;
-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE products (

  id INTEGER(10) not null auto_increment,
  product_name varchar(50) ,
  department_name varchar(50) ,
  price double,
  stock_quantity integer,
  primary key (id)
  );
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Milk","Dairy",2.5,43);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Ice Cream","Forzen",5.3,56);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Chicken Breast","Deli",4,33);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Beef Patty","Deli",8,89);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Chips","Snack",3.5,143);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Coke","Drink",0.8,768);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Noddles","Noddles",4.7,32);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Cheese","Dairy",7,89);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Dog Food","Pet Food",52.5,19);
  
  INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES
  ("Toliet Paper","Others",12.5,88);
  
  SELECT * FROM products;