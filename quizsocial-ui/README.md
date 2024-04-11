# Project 4 
## Hanpei Zhang
## Project Initialization
User can run this project by following project instruction from canvas

1.Install database server.

2.Change to directory draught-services-ui and run, npm install

3.Change to directory draught-server-api and do:

    1.add your database user-name and password to the file, database/mySQLconnect.js.

    2.run, npm  install to install the node modules.

    3.run the API server by doing: node api_server.js 

4.Run this query either at the database prompt or in the MySQL Workbench to find out the user-id of a user: SELECT * FROM scheduler_users; 

5.Change to directory draught-services-ui and start the UI server by doing: npm start. This will run the React App in a browser window where you can login. Use one of the user-id(s) from the output of the scheduler_users and click the button to log in.

## Project Overview
This draught service app have 6 major components

1. Summary page 

![summary](./screenshot/read1.png)

2. Market Page

![Market](./screenshot/read2.png)

3. Empolyees Page

![Employee](./screenshot/read3.png)

4. Route Page

![Routes](./screenshot/read.png)

5. Accounts Page 

![Routes](./screenshot/read4.png)

6. Transaction Page, this page have 5 submenus

![Transaction](./screenshot/read 5.png)

7. For Transaction count, you can select the cycle to display the number of transactions for that cycle, for testing purpose I only add last 5 (not counting the last one on the table) cycles to avoid a enormous dropdown menu.

![Transaction](./screenshot/read7.png)

![Transaction](./screenshot/read8.png)

8. By Account, you can select the cycle and click on individual account to get the transaction for individual accountID (I only included first 200 accounts, because my hardware is not powerful enough, loading all the accounts will take a very long time, you can lift the limit in the AccountsController.js)

![Transaction](./screenshot/read9.png)

9. By Market, same to the By Account

![Transaction](./screenshot/read10.png)

10. By Routes, same operation

![Transaction](./screenshot/read11.png)

11. All Routes, you can select the cycle, it will display all the routes with its corresponding transactions.

![Transaction](./screenshot/read 12.png)





