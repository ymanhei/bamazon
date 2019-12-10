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
    connection.query(
        "SELECT * FROM products",    
        function(err, results) {
          if (err) throw err;
          for (let i = 0;i < results.length;i++) {
           // console.log(results[i].product_name);

          }
                 
            
            
          inquirer
          .prompt([{
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              
              for (var i = 0; i < results.length; i++) {
                  var numspaces = 50 - results[i].product_name.length;
                  console.log(numspaces);
                  var strspace = ""
                  var strspace2 = "                              "
                  for   (let j = 0; j < numspaces;j++) {
                      strspace = strspace + " ";
                      //console.log("ST" + strspace);
                  }

                  
                choiceArray.push(results[i].product_name + strspace + results[i].price + strspace2 +results[i].stock_quantity) ;
              }
              return choiceArray;
            },
            message: "What auction would you like to place a bid in? \n Product" +                   "                                              Price"                             + "                             Quantity"
          },
          {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
          }])
          .then(function(answer) {
        
            console.log("TEST");
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                console.log(answer.choice);
              if (results[i].product_name === answer.choice) {
                chosenItem = results[i];
                console.log(chosenItem);
              }
            }
    
            // determine if bid was high enough
            if (chosenItem.stock_quantity > parseInt(answer.bid)) {
              // bid was high enough, so update db, let the user know, and start over
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: chosenItem.stock_quantity - answer.bid
                  },
                  {
                    product_name: chosenItem.product_name
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Products purchased successfully!");
                  
                }
              );
            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log("Your bid was too low. Try again...");
              start();
            }

          });  
        }
      );
      connection.end();  

    
  }