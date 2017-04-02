# Initializes a MySQL Database
import mysql.connector
from exceptions import InputError, MySqlError

# Define constants
DB_NAME = "HealthCareDB"

TABLES = {}
# Create table statements
# replace with own schema

TABLES['Appointments'] = (
    "CREATE TABLE `Appointments` ("
    "   `appointment_id` INT NOT NULL AUTO_INCREMENT,"
    "   `employee_id` INT NOT NULL,"
    "   `patient_id` INT NOT NULL,"
    "   `date_time` DATETIME NOT NULL,"
    "   `completed` BIT,"
    "   PRIMARY KEY (`appointment_id`)"
    ") ENGINE=InnoDB")

TABLES['Patients'] = (
    "CREATE TABLE `Patients` ("
    "   `patient_id` INT NOT NULL AUTO_INCREMENT,"
    "   `last_name` VARCHAR(30) NOT NULL,"
    "   `first_name` VARCHAR(30) NOT NULL,"
    "   `address` VARCHAR(75) NOT NULL,"
    "   `phone_number` VARCHAR(12) NOT NULL,"
    "   `email` VARCHAR(25) NOT NULL,"
    "   `ssn` VARCHAR(11) NOT NULL,"
    "   `insurance_provider` VARCHAR(50) NOT NULL,"
    "   PRIMARY KEY (`patient_id`)"
    ") ENGINE=InnoDB")

TABLES['Employees'] = (
    "CREATE TABLE `Employees` ("
    "   `employee_id` INT NOT NULL AUTO_INCREMENT,"
    "   `last_name` VARCHAR(30) NOT NULL,"
    "   `first_name` VARCHAR(30) NOT NULL,"
    "   `type` TINYINT NOT NULL,"
    "   `associated_id` INT NOT NULL,"
    "   PRIMARY KEY (`employee_id`)"
    ") ENGINE=InnoDB")

TABLES['Payment'] = (
    "CREATE TABLE `Payment` ("
    "   `invoice_number` INT NOT NULL AUTO_INCREMENT,"
    "   `amount` DECIMAL(7,2) NOT NULL,"
    "   `payment_method` TINYINT NOT NULL,"
    "   `type` TINYINT NOT NULL,"
    "   `date_paid` DATETIME NOT NULL,"
    "   `reference_number` INT,"
    "   PRIMARY KEY (`invoice_number`)"
    ") ENGINE=InnoDB")

TABLES['Reports'] = (
    "CREATE TABLE `Reports` ("
    "   `report_id` INT NOT NULL AUTO_INCREMENT,"
    "   `type` TINYINT NOT NULL,"
    "   `doctor_name` VARCHAR(30) NOT NULL,"
    "   `patient_count` TINYINT NOT NULL,"
    "   `income` DECIMAL(10,2) NOT NULL,"
    "   PRIMARY KEY (`report_id`)"
    ") ENGINE=InnoDB")


TABLES['PatientRecords'] = (
    "CREATE TABLE `PatientRecords` ("
    "   `appointment_id` INT NOT NULL AUTO_INCREMENT,"
    "   `weight` TINYINT NOT NULL,"
    "   `height` VARCHAR(30) NOT NULL,"
    "   `blood_pressure` TINYINT NOT NULL,"
    "   `visit_reason` DECIMAL(10,2) NOT NULL,"
    "   `treatment_content` VARCHAR(50),"
    "   `prescription` VARCHAR(50),"
    "   PRIMARY KEY (`appointment_id`)"
    ") ENGINE=InnoDB")


def create_database(cursor):
    """
    Attempt to create the DB_NAME database
    """
    try:
        create_sda_db = "CREATE DATABASE {}".format(DB_NAME)
        print("Creating database {}".format(DB_NAME))
        cursor.execute(create_sda_db)
    except mysql.connector.Error as mysql_error:
        raise MySqlError(message='Failed creating database.',
                         args=mysql_error.args)


def connect_to_database(connection):
    """
    Attempt to connect to DB_NAME database
    """
    try:
        connection.database = DB_NAME
    except mysql.connector.Error as mysql_error:
        raise MySqlError(message='There was a problem connecting to the database.',
                         args=mysql_error.args)


def create_tables(cursor, connection):
    """
    Attempt to execute each CREATE statement in TABLES
    to create tables.
    """
    connect_to_database(connection)
    for name, query in TABLES.items():
        try:
            print("Creating table {} ".format(name))
            # Execute the CREATE xxx in TABLES
            cursor.execute(query)
        except mysql.connector.Error as mysql_error:
            raise MySqlError(message='There was a problem creating table {}. Please check your SQL Syntax.'.format(name),
                             args=mysql_error.args)


def main(username='', password=''):
    if username == "" or password == "":
        # Get username and password for desired account
        username = input("Username (root or other account): ")
        password = input("Password: ")

    # Connect to the MySQL server with user credentials
    # Will exit if MySQL Server is not started
    try:
        mysql_connection = mysql.connector.connect(user=username,
                                                   password=password)
    except mysql.connector.Error as err:
        raise InputError(message='There was a problem connecting to the server. Please check your username and password',
                         args=err.args)

    # Get cursor from server connection
    mysql_cursor = mysql_connection.cursor()

    # Set autocommit to false for batch
    mysql_connection.autocommit = False

    # Start a transaction
    mysql_connection.start_transaction()

    # Create database
    create_database(mysql_cursor)

    # Create tables
    create_tables(mysql_cursor, mysql_connection)

    # Commit transaction
    mysql_connection.commit()

    # Close cursor
    mysql_cursor.close()

    # Close connection
    mysql_connection.close()

if __name__ == '__main__':
    try:
        main()
    except (InputError, MySqlError) as db_exception:
        print(db_exception.message)