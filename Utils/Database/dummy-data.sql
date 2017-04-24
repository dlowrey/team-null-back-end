INSERT INTO employees(`last_name`, `first_name`, `type`, `associated_id`) 
VALUES
	('Smith', 'Bill', 4, null),
	('Lowrey', 'Dane', 1, 7),
	('Griswold-Steiner', 'Nils', 1, 8),
	('Woodson', 'Joyelle', 1, 9 ),
	('Inting', 'Jared', 1, 10 ),
	('Shin','Michael', 1, 11 ),
	('Collins', 'Tyler', 2, 2),
	('Gaubert', 'Jack', 2, 3),
	('Kirk', 'Connor', 2, 4),
	('Two', 'Quincy', 2, 5),
	('LaComb', 'Shelby', 2, 6),
	('Lowrey', 'Jenna', 3, null),
	('Mitts', 'Lynn', 3, null),
	('Halpart', 'Jim', 3, null)
;


INSERT INTO appointments (employee_id, patient_id, date_time, completed)
VALUES
(2, 1, '2017-05-05 11:30:00', 0),
(3, 2, '2017-05-05 01:30:00', 0),
(4, 3, '2017-05-05 11:00:00', 0),
(5, 4, '2017-05-06 04:30:00', 0),
(6, 5, '2017-05-05 02:30:00', 0),
(2, 6, '2017-05-05 12:30:00', 0),
(3, 7, '2017-05-06 10:30:00', 0),
(4, 8, '2017-05-06 03:30:00', 0),
(5, 9, '2017-05-06 05:30:00', 0),
(6, 10, '2017-05-06 10:30:00', 0)
;


