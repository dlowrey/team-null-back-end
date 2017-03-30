# DATABASE SCHEME

## Appointments
* All appointment information
*
| Attribute | Type | Description |
| --------- | ---- | ----------- |
| appointment_id | AUTOINCREMENT Integer | Unique ID for appointment |
| employee_id | Integer | ID for associated doctor |
| patient_id | Integer | ID for associated patient |
| date_time | DateTime | Date and time of the appointment |
| completed | TinyInt | Boolean: 1 for completed, 2 otherwise |
