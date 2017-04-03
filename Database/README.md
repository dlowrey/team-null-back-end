# DATABASE SCHEME

**Appointments**
* All appointment information
* Primary key: appointment_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| appointment_id | AUTOINCREMENT Integer not null | Unique ID for appointment |
| employee_id | Integer not null | ID for associated doctor |
| patient_id | Integer not null | ID for associated patient |
| date_time | DateTime not null | Date and time of the appointment |
| completed | TinyInt not null | Boolean: 1 for completed, 2 otherwise |



**Patients**
* All patient information
* Primary key: patient_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| patient_id | AUTOINCREMENT Integer not null | Unique Patient ID |
| last_name | String not null | Patient's last name |
| first_name | String not null | Patient's first name |
| address | String not null | Patient's address |
| phone_number | String not null | Patient's phone number |
| email | String not null | Patient's email address |
| ssn | String not null | Patient's social security number |
| insurance_provider | String not null | Patient's insurance provider |



**Patient Records**
* Patient physical information and treatment record
* Primary key: appointment_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| appointment_id | Integer not null | The appointment's ID|
| weight | Integer | Patient's weight in pounds during specific visit |
| height | Integer | Patient's height in inches during specific visit |
| blood_pressure | Integer | Patient's blood pressure during specific visit |
| visit_reason | String | Reason patient came to the hospital |
| treatment_content | String | Details of treatment provided during specific visit |
| prescription | String | Medication (if any) prescribed to patient |



**Reports**
* Daily and monthly report information
* Primary key: report_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| report_id | AUTOINCREMENT Integer not null | Unique report ID |
| type | TinyInt not null | Boolean: 1 for Daily, 2 otherwise |
| doctor_name | String not null | Doctor's name |
| patient_count | Integer not null | Number of patients treated by doctor |
| income | Float not null | Total revenue by doctor |



**Employees**
* Employee information
* Primary key: employee_id

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| employee_id | AUTOINCREMENT Integer not null | Unique employee ID |
| last_name | String not null | Employee's last name |
| first_name | String not null | Employee's first name |
| type | TinyInt not null | 1: Doctor, 2: Nurse, 3: Staff, 4: CEO |
| associated_id | Integer | ID of the Doctor a Nurse is associated with |



**Payment**
* Payment information
* Primary key: invoice_number

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| invoice_number | AUTOINCREMENT Integer not null | Unique invoice number |
| amount | Float not null | Total cost of a visit |
| payment_method | TinyInt not null | 1: Cash, 2: Credit, 3: Debit, 4: Check |
| type | TinyInt not null | 1: Copay, 2: Invoice, 3: Penalty |
| date_paid | DateTime | Date an invoice is paid |
| reference_number | Integer | Reference number from card company |