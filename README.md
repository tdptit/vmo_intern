1.DATABASE

	CREATE TABLE tb_category (
	id INT(55) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE tb_product (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(255),
    category_id INT(55),
    quantity INT(55),
    added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price INT(55));

    CREATE TABLE tb_stock (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    product_id INT(55),
    addQuantity INT(55),
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
		
    CREATE TABLE tb_order (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    order_list INT(55),
    product_id INT(55),
    quantity INT(55),
    time_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

    CREATE TABLE tb_user
    (
        id INT(55) AUTO_INCREMENT PRIMARY KEY,
        username TEXT,
        password TEXT,
        role TEXT);
				
  	CREATE  TRIGGER  add_Stock
  	BEFORE  INSERT ON  tb_stock
  	BEGIN
	  	IF NOT EXISTS (SELECT * FROM tb_product WHERE id = NEW.product_id) THEN
    	  	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
      	ELSE
      		UPDATE tb_product SET quantity = NEW.addQuantity + quantity WHERE id = NEW.product_id;
     	END IF;
  	END
	
  	CREATE  TRIGGER  check_product_transaction
  	BEFORE  INSERT ON  tb_order
  	BEGIN
	  	IF NOT EXISTS (SELECT * FROM tb_product WHERE id = NEW.product_id) THEN
    	  	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID Product Not Found';
      	ELSEIF
    	  	EXISTS (SELECT quantity FROM tb_product WHERE id = NEW.product_id AND (quantity = 0 OR quantity - NEW.quantity < 0)) 
          	THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Out Of Stock';
     	END IF;
  	END

    CREATE  TRIGGER  reduces_stock
    AFTER INSERT ON  tb_order
        BEGIN
            UPDATE tb_product SET quantity = tb_product.quantity - NEW.quantity
            WHERE id = NEW.product_id;
        END
    END


2.CHỨC NĂNG

2.1.User

	GET api
	POST api/user/register
	POST api/user/login
    
![image](https://user-images.githubusercontent.com/106986765/183906860-d8071b3b-c386-4c8d-b535-4dd93c648287.png)

2.2.Category

	GET api/category
	GET api/category/:id 
	POST api/category
	PUT api/category/:id 
	DELETE api/category/:id 
	
![image](https://user-images.githubusercontent.com/106986765/183907844-3dc83788-b5ba-4e55-b9e1-8960766622ac.png)
	
2.3.Product
	
	GET api/product
	GET api/product/:id 
	POST api/product 
	PUT api/product/:id 
	DELETE api/product/:id 

![image](https://user-images.githubusercontent.com/106986765/183909288-01b679dd-1d10-492f-8eac-86e477638341.png)

2.4.Search, Pagination, Sort in Product

	GET /product/?search=nasi
	GET product/?page=1&content=4
	GET product/?order=name&sort=DESC
	GET product/?order=category&sort=ASC
	GET product/?order=date_update&sort=DESC
	
2.5.Add / Reduce Product Order

	POST order/add
	POST order/reduce

	
