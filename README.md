# team-null-back-end
Repository for the Team NULL Software Engineering I back end



# Setting up Python 3.4

MySQL's Python Connector currently only supports Python 3.4. If you do not have Python installed on your machine, please visit the [downloads](https://www.python.org/downloads/release/python-344/) page and install Python 3.4. If you currently have another version of Python on your machine, you will still need to download Python 3.4

# Setting up MySQL

1. Go to the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) download page and select your platform.
2. Click "Download"
3. Select the installer for your OS, Preferably the one that is not web based
4. When the download is complete, open the installer. You will be walked through a series of steps to set up a MySQL server.
5. Accept the license agreement
6. Select **Developer Default**
7. Choose an installation directory and a data directory. I made my data directory inside MySQL/data
8. Allow the Installer to Check and Fix requirements
9. Click **Execute** in the Installation step. This step will take a few minutes to complete.
10. Click Next until you get to the **Accounts and Roles** set up page. Here you will need to add a password for the **root** user. Make it something you will remember! You can also add another user account if you would like.
11. Keep all default settings from here on out.

You can now access the MySQL Community server and modify databases through the MySQL WorkBench app that was installed on your device. The python ````python initdb.py```` script will set up a test database and a test table for you if you run it and give it your root account credentials.
