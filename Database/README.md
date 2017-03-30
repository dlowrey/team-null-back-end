# DATABASE SCHEME

**Appointments**
* All appointment information
* Primary key: appointment_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| appointment_id | AUTOINCREMENT Integer | Unique ID for appointment |
| employee_id | Integer | ID for associated doctor |
| patient_id | Integer | ID for associated patient |
| date_time | DateTime | Date and time of the appointment |
| completed | TinyInt | Boolean: 1 for completed, 2 otherwise |



**Patients**
* All patient information
* Primary key: patient_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| last_name | String | Patient's last name |
| first_name | String | Patient's first name |
| address | String | Patient's address |
| phone_number | String | Patient's phone number |
| email | String | Patient's email address |
| ssn | String | Patient's social security number |
| insurance_provider | String | Patient's insurance provider |
| patient_id | AUTOINCREMENT Integer | Unique Patient ID |



**Reports**
* Daily and monthly report information
* Primary key: report_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| report_id | AUTOINCREMENT Integer | Unique report ID |
| type | TinyInt | Boolean: 1 for Daily, 2 otherwise |
| doctor_name | String | Doctor's name |
| patient_count | Integer | Number of patients treated by doctor |
| income | Float | Total revenue by doctor |



**Employees**
* Employee information
* Primary key: employee_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| type | TinyInt | 1: Doctor, 2: Nurse, 3: Staff, 4: CEO |
| last_name | String | Employee's last name |
| first_name | String | Employee's first name |
| employee_id | AUTOINCREMENT Integer | Unique employee ID |
| associated_id | Integer | ID of the Doctor a Nurse is associated with |



**Payment**
* Payment information
* Primary key: invoice_number

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| amount | Float | Total cost of a visit |
| payment_method | TinyInt | 1: Cash, 2: Credit, 3: Debit, 4: Check |
| type | TinyInt | 1: Copay, 2: Invoice, 3: Penalty |
| invoice_number | AUTOINCREMENT Integer | Unique invoice number |
| date_paid | DateTime | Date an invoice is paid |
| reference_number | Integer | Reference number from card company |