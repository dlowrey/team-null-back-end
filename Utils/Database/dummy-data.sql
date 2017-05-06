INSERT INTO employees(`last_name`, `first_name`, `type`, `associated_id`,`password`)
VALUES
	('Smith', 'Bill', 4, null,'pass1'),
	('Lowrey', 'Dane', 1, 7,'pass2'),
	('Griswold-Steiner', 'Nils', 1, 8,'pass3'),
	('Woodson', 'Joyelle', 1, 9,'pass4'),
	('Inting', 'Jared', 1, 10,'pass5'),
	('Shin','Michael', 1, 11,'pass6'),
	('Collins', 'Tyler', 2, 2,'pass7'),
	('Gaubert', 'Jack', 2, 3,'pass8'),
	('Kirk', 'Connor', 2, 4,'pass9'),
	('Two', 'Quincy', 2, 5,'pass10'),
	('LaComb', 'Shelby', 2, 6,'pass11'),
	('Lowrey', 'Jenna', 3, null,'pass12'),
	('Mitts', 'Lynn', 3, null,'pass13'),
	('Halpart', 'Jim', 3, null,'pass14')
;


-- INSERT INTO appointments (employee_id, patient_id, date_time, completed)
-- VALUES
-- (2, 1, '2017-05-05 11:30:00', 0),
-- (3, 2, '2017-05-05 01:30:00', 0),
-- (4, 3, '2017-05-05 11:00:00', 0),
-- (5, 4, '2017-05-06 04:30:00', 0),
-- (6, 5, '2017-05-05 02:30:00', 0),
-- (2, 6, '2017-05-05 12:30:00', 0),
-- (3, 7, '2017-05-06 10:30:00', 0),
-- (4, 8, '2017-05-06 03:30:00', 0),
-- (5, 9, '2017-05-06 05:30:00', 0),
-- (6, 10, '2017-05-06 10:30:00', 0)
-- ;

INSERT INTO patients (last_name, first_name, address, phone_number, email, ssn, insurance_provider)
VALUES
('Worthy', 'Bill', '2408 Mac Davis Lane', '8062457894', 'dane.r.lowrey@gmail.com', '696969699', 'We Aint Got U'),
('Smith', 'John', '123 15th St', '5554125123', 'j.smith@gmail.com', '555555555', 'State Farm'),
('Sanders', 'Jane', '512 Clover St', '5554105092', 'jane.smith@gmail.com', '555660000', 'Blue Cross'),
('Candy', 'Steve', '614 Erie St', '8063022059', 'candyman@gmail.com', '555103029', 'State Farm'),
('Pratt', 'Chris', '501 Huron St', '5556019809', 'c.pratt@marvel.com', '550206819', 'We Aint Got U'),
('Smithers', 'Diane', '200 Simpson Ave', '5593120928', 'diane.smithers@gmail.com', '691554018', 'State Farm'),
('Prady', 'Dick', '90 Forest Lane', '5553015681', 'jprady@yahoo.com', '195279650', 'Blue Cross'),
('Clinton', 'Harry', '1216 Quaker Ave', '8064221037', 'h.clinton@hotmail.com', '210732892', 'State Farm'),
('Blake', 'Aaron', '702 Peele St', '2029701739', 'a_a_ron.blake@gmail.com', '501962381', 'Key Insurance'),
('Ferguson', 'George', '682 Needful St', '6666666666', 'g.ferguson@king.com', '666666666', 'Beast Insurance')
;
