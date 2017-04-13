import mysql.connector
from Utils.exceptions import InputError, MySqlError

# Define constants
DB_NAME = "HealthCareDB"

TABLES = {}
TABLES['Appointments'] = (
    "CREATE TABLE IF NOT EXISTS `Appointments` ("
    "   `appointment_id` INT NOT NULL AUTO_INCREMENT,"
    "   `employee_id` INT NOT NULL,"
    "   `patient_id` INT NOT NULL,"
    "   `date_time` DATETIME NOT NULL,"
    "   `completed` BIT NOT NULL,"
    "   PRIMARY KEY (`appointment_id`)"
    ") ENGINE=InnoDB")

TABLES['Patients'] = (
    "CREATE TABLE IF NOT EXISTS `Patients` ("
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
    "CREATE TABLE IF NOT EXISTS `Employees` ("
    "   `employee_id` INT NOT NULL AUTO_INCREMENT,"
    "   `last_name` VARCHAR(30) NOT NULL,"
    "   `first_name` VARCHAR(30) NOT NULL,"
    "   `type` TINYINT NOT NULL,"
    "   `associated_id` INT,"
    "   PRIMARY KEY (`employee_id`)"
    ") ENGINE=InnoDB")

TABLES['Payment'] = (
    "CREATE TABLE IF NOT EXISTS `Payment` ("
    "   `invoice_number` INT NOT NULL AUTO_INCREMENT,"
    "   `amount` DECIMAL(7,2) NOT NULL,"
    "   `payment_method` TINYINT NOT NULL,"
    "   `type` TINYINT NOT NULL,"
    "   `date_paid` DATETIME,"
    "   `reference_number` INT,"
    "   PRIMARY KEY (`invoice_number`)"
    ") ENGINE=InnoDB")

TABLES['Reports'] = (
    "CREATE TABLE IF NOT EXISTS `Reports` ("
    "   `report_id` INT NOT NULL AUTO_INCREMENT,"
    "   `type` TINYINT NOT NULL,"
    "   `doctor_name` VARCHAR(30) NOT NULL,"
    "   `patient_count` TINYINT NOT NULL,"
    "   `income` DECIMAL(10,2) NOT NULL,"
    "   PRIMARY KEY (`report_id`)"
    ") ENGINE=InnoDB")


TABLES['PatientRecords'] = (
    "CREATE TABLE IF NOT EXISTS `PatientRecords` ("
    "   `appointment_id` INT NOT NULL,"
    "   `weight` TINYINT,"
    "   `height` TINYINT,"
    "   `blood_pressure` TINYINT,"
    "   `visit_reason` Varchar(50),"
    "   `treatment_content` VARCHAR(50),"
    "   `prescription` VARCHAR(50),"
    "   PRIMARY KEY (`appointment_id`)"
    ") ENGINE=InnoDB")


def init_connection(username=None, password=None):
    """Initializes connection to running MySQL server
    
    Connects to a running MySQL server using a username/password
    and returns the connection if successful.
    
    Args:
        username: the username of the account on the server to connect with
        password: the password of the account on the server to connect with
    Returns:
        connection: the open connection to the MySQL server
    Raises:
        InputError: The username or password input was incorrect
    
    """
    if not username or not password:
        username = input("Username: ")
        password = input("Password: ")

    try:
        connection = mysql.connector.connect(user=username,
                                             password=password)
    except mysql.connector.Error as err:
        raise InputError(message='There was a problem connecting. Please check'
                                 ' your username and password, and make sure'
                                 ' the server is running.',
                         args=err.args)
    return connection


def init_database(connection):
    """Initialize the database for use.
    
    Creates the DB_NAME database and creates any tables defined
    in TABLES dictionary inside of the newly created database
    
    Args:
         connection: the connection to the MySQL Server
    Raises:
         MySqlError: Raised if there is a connection error or SQL syntax error
    """
    create_db = 'CREATE DATABASE IF NOT EXISTS {}'.format(DB_NAME)
    try:
        cursor = connection.cursor()
        cursor.execute(create_db)  # Create the database
        connection.database = DB_NAME  # Connect to the database

        for name,query in TABLES.items():   # Create each table in the database
            print('Creating table {}'.format(name))
            cursor.execute(query)

        cursor.close()
    except mysql.connector.Error as err:
        raise MySqlError(message='There was a problem initializing'
                                 ' the database.',
                         args=err.args)


def main(username=None, password=None):
    cnx = init_connection(username, password)
    init_database(cnx)
    cnx.close()

if __name__ == '__main__':
    try:
        main()
    except (InputError, MySqlError) as db_exception:
        print(db_exception.message)