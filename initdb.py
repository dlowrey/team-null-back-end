# Initializes a MySQL Database

import sys
import mysql.connector
from mysql.connector import errorcode

# Define constants
DB_NAME = "HealthCareDB"

TABLES = {}
# Create table statements
# replace with own schema

TABLES['Appointments'] = (
    "CREATE TABLE `Appointments` ("
    "   `appointment_id` int(10) NOT NULL AUTO_INCREMENT,"
    "   `employee_id` int(10) NOT NULL,"
    "   `patient_id` int(10) NOT NULL,"
    "   `date_time` DATETIME NOT NULL,"
    "   `completed` BIT,"
    "   PRIMARY KEY (`appointment_id`)"
    ") ENGINE=InnoDB")

TABLES['Patients'] = (
    "CREATE TABLE `Patients` ("
    "   `patient_id` int(10) NOT NULL AUTO_INCREMENT,"
    "   `last_name` varchar(30) NOT NULL,"
    "   `first_name` varchar(30) NOT NULL,"
    "   `address` varchar(75) NOT NULL,"
    "   `phone_number` varchar(12) NOT NULL,"
    "   `email` varchar(25) NOT NULL,"
    "   `ssn` varchar(11) NOT NULL,"
    "   `insurance_provider` varchar(50) NOT NULL,"
    "   PRIMARY KEY (`patient_id`)"
    ") ENGINE=InnoDB")


def create_database(cursor, connection):
    """
    Attempt to create the DB_NAME database
    """
    # start transaction
    connection.start_transaction()
    try:
        create_sda_db = "CREATE DATABASE {}".format(DB_NAME)
        print("Creating database {}".format(DB_NAME))
        cursor.execute(create_sda_db)
    except mysql.connector.Error as mysqlError:
        print("Failed creating database: {}".format(mysqlError))
        sys.exit()
    # commit transactions
    connection.commit()


def connect_to_database(connection):
    """
    Attempt to connecect to DB_NAME database
    """
    try:
        connection.database = DB_NAME
    except mysql.connector.Error as mysqlError:
        if mysqlError.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(mysqlError)
        sys.exit()


def create_tables(cursor, connection):
    """
    Attempt to execute each CREATE statement in TABLES
    to create tables.
    """
    # start transaction
    connection.start_transaction()
    # Connect to database
    connect_to_database(connection)
    for name, query in TABLES.items():
        try:
            print("Creating table {}: ".format(name), end='')
            # Execute the CREATE xxx in TABLES
            cursor.execute(query)
        except mysql.connector.Error as mysqlError:
            if mysqlError.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists in {}".format(DB_NAME))
            elif mysqlError.errno == errorcode.ER_SYNTAX_ERROR:
                print(mysqlError)
            else:
                print(mysqlError.msg)
        else:
            print("OK")

        # commit transactions
        connection.commit()


# Get username and password for desired account
username = input("Username (root or other account): ")
password = input("Password: ")

# Connect to the MySQL server with user credentials\
try:
    mysql_connection = mysql.connector.connect(user=username,
                                               password=password)
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Username or Password was incorrect.")
    else:
        print(err)
    sys.exit()

# Get cursor from server connection
mysql_cursor = mysql_connection.cursor()
# Set autocommit to false for batch
mysql_connection.autocommit = False
# Create database
create_database(mysql_cursor, mysql_connection)
# Create tables
create_tables(mysql_cursor, mysql_connection)
# Close cursor
mysql_cursor.close()
# Close connection
mysql_connection.close()
