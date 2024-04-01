`quizsocial.sql` is the skeleton database I built for the project.

To import the database, you can do the following:

1. **Create a New Database:**  
   Execute the following SQL command:CREATE DATABASE IF NOT EXISTS quizsocial;

2. **Import the Database:**  
In your command line interface, use the command below. Replace `username`, `database_name`, and `path_to_your_sql_file` with your actual database username, the name of your database, and the path to your SQL file, respectively.

mysql -u username -p database_name < path_to_your_sql_file

This database should give us a good start for our project.
