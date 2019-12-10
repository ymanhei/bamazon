var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
          if (err) throw err;
          console.log("Product" +                   "                                           Price"                             + "                                          Quantity");
          for (var i = 0; i < results.length; i++) { 
            var strspace = ""
            var strspace2 = ""        
            var numspaces = 50 - results[i].product_name.length;
            //var numspaces2 = 70 - numspaces;
            for   (let j = 0; j < numspaces;j++) {
              strspace = strspace + " ";
              //console.log("ST" + strspace);
          }  
          for   (let k = 0; k < 50 ;k++) {
            strspace2 = strspace2 + " ";
            //console.log("ST" + strspace);
        }  
          
          console.log(results[i].product_name + strspace + results[i].price + strspace2 + results[i].stock_quantity);
          }
        
        inquirer
          .prompt([{
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              
              for (var i = 0; i < results.length; i++) {        
                choiceArray.push(results[i].product_name) ;
              }
              return choiceArray;
            },
            message: "What auction would you like to place a bid in? "
          },
          {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
          }])
          .then(function(answer) {
        
           // console.log("TEST");
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                //console.log(answer.choice);
              if (results[i].product_name === answer.choice) {
                chosenItem = results[i];
                //console.log(chosenItem);
              }
            }
    
            
            // determine if bid was high enough
            if (chosenItem.stock_quantity > parseInt(answer.bid)) {
              // bid was high enough, so update db, let the user know, and start over
              //console.log(chosenItem.stock_quantity);
              //console.log(parseInt(answer.bid));
              //console.log(chosenItem.id);
              var new_quantity = chosenItem.stock_quantity - parseInt(answer.bid);
              //console.log(new_quantity);
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: new_quantity
                  },
                  {
                    id: chosenItem.id
                  }
                ],
                function(err) {
                  if (err) throw err;
                  console.log("----------------------------------\nBid placed successfully!\n-------------------------------------");
                  console.log("----------------------------------\nThe total cost of the purchase is $" + parseInt(answer.bid) * chosenItem.price + "\n-------------------------------------");
                  start();
                }
              );
  
              

            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log("----------------------------------\nNot enough stock. Try again later...\n----------------------------------");
              start();
            }

          });  
      
       

    });
    //connection.end(); 
  }

  