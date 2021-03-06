# DATABASE SCHEME

**Appointments**
* All appointment information
* Primary key: id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| id | AUTOINCREMENT Integer not null | Unique ID for appointment |
| employee_id | Integer not null | ID for associated doctor |
| patient_id | Integer not null | ID for associated patient |
| date_time | DateTime not null | Date and time of the appointment |
| completed | TinyInt not null | Boolean: 0 for uncompleted, 1 for completed, 2 for penalty |



**Patients**
* All patient information
* Primary key: id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| id | AUTOINCREMENT Integer not null | Unique Patient ID |
| last_name | Varchar(30) not null | Patient's last name |
| first_name | Varchar(30 not null | Patient's first name |
| address | Varchar(75) not null | Patient's address |
| phone_number | Varchar(12) not null | Patient's phone number |
| email | Varchar(25) not null | Patient's email address |
| ssn | Varchar(11) not null | Patient's social security number |
| insurance_provider | Varchar(50) not null | Patient's insurance provider |



**Patient Records**
* Patient physical information and treatment record
* Primary key: appointment_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| appointment_id | Integer not null | The appointment's ID|
| weight | SMALLINT DEFAULT 0 | Patient's weight in pounds during specific visit |
| height | SMALLINT DEFAULT 0 | Patient's height in inches during specific visit |
| blood_pressure | SMALLINT DEFAULT 0 | Patient's blood pressure during specific visit |
| reason | Varchar(50) | Reason patient came to the hospital |
| treatment_content | Varchar(50) | Details of treatment provided during specific visit |
| prescription | Varchar(50) | Medication (if any) prescribed to patient |



**Reports**
* Daily and monthly report information
* Primary key: id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| id | AUTOINCREMENT Integer not null | Unique report ID |
| type | TINYINT not null | Boolean: 1 for Daily, 2 otherwise |
| doctor_name | Varchar(30) not null | Doctor's name |
| patient_count | Integer not null | Number of patients treated by doctor |
| total_income | Decimal(10,2) not null | Total revenue by doctor |
| date_time    | DATETIME DEFAULT CURRENT_TIMESTAMP | Date report record was inserted |



**Employees**
* Employee information
* Primary key: id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| id | AUTOINCREMENT Integer not null | Unique employee ID |
| last_name | Varchar(30) not null | Employee's last name |
| first_name | Varchar(30) not null | Employee's first name |
| type | TinyInt not null | 1: Doctor, 2: Nurse, 3: Staff, 4: CEO |
| associated_id | Integer | ID of the Doctor a Nurse is associated with |



**Payments**
* Payment information
* Primary key: id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| id | AUTOINCREMENT Integer not null | Unique invoice number |
| appointment_id | Integer not null | Associated appointment id |
| amount | Decimal(7,2) not null | Total cost of a visit |
| method | TinyInt not null | 1: Cash, 2: Credit, 3: Debit, 4: Check |
| type | TinyInt not null | 1: Copay, 2: Invoice, 3: Penalty |
| date_paid | DateTime | Date an invoice is paid |
| reference_number | Integer | Reference number from card company |
