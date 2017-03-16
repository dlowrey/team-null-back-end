import os


# NET START / STOP MYSQLXY
# This is for starting the MySQL Server IF it has been
# installed as a Windows Service.

def start_server():
    """
    Start the MySQL Server
    """
    os.system("NET START MYSQL57")


def stop_server():
    """
    Stop the MySQL server
    """
    os.system("NET STOP MYSQL57")
