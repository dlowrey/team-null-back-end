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
