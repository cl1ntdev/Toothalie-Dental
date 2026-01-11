=== DATABASE TABLES ===
DESCRIBE appointment;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
appointment_id 	int 	NO 	PRI 	NULL 	auto_increment
appointment_date 	datetime 	NO 		CURRENT_TIMESTAMP 	DEFAULT_GENERATED
patient_id 	int 	NO 	MUL 	NULL 	
dentist_id 	int 	NO 	MUL 	NULL 	
schedule_id 	int 	NO 	MUL 	NULL 	
emergency 	tinyint(1) 	YES 		NULL 	
appointment_type_id 	int 	YES 	MUL 	NULL 	
user_set_date 	varchar(50) 	YES 		NULL 	
status 	varchar(50) 	YES 		NULL 	
message 	varchar(200) 	YES 		NULL 	
deleted_on 	datetime 	YES 		NULL 	
service_id 	int 	YES 	MUL 	NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE appointment_log;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
appointment_id 	int 	YES 	MUL 	NULL 	
logged_at 	datetime 	NO 		NULL 	
actor_type 	varchar(20) 	NO 		NULL 	
action 	varchar(100) 	YES 		NULL 	
message 	longtext 	YES 		NULL 	
snapshot 	json 	YES 		NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE appointment_type;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
appointment_name 	varchar(50) 	YES 		NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE dentist_service;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
user_id 	int 	NO 	MUL 	NULL 	
service_id 	int 	NO 	MUL 	NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE reminder;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
information 	json 	NO 		NULL 	
appointment_id 	int 	YES 	UNI 	NULL 	
viewed 	tinyint(1) 	YES 		NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE role;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
role_name 	varchar(100) 	NO 		NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE schedule;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
scheduleID 	int 	NO 	PRI 	NULL 	auto_increment
day_of_week 	varchar(20) 	NO 		NULL 	
time_slot 	varchar(20) 	NO 		NULL 	
dentistID 	int 	NO 	MUL 	NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE service;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
name 	varchar(50) 	NO 		NULL 	
service_type_id 	int 	NO 	MUL 	NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE service_type;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
name 	varchar(50) 	NO 		NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE user;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
email 	varchar(180) 	NO 	UNI 	NULL 	
roles 	json 	NO 		NULL 	
password 	varchar(255) 	NO 		NULL 	
username 	varchar(100) 	NO 	UNI 	NULL 	
first_name 	varchar(50) 	YES 		NULL 	
last_name 	varchar(50) 	YES 		NULL 	
created_at 	datetime 	YES 		CURRENT_TIMESTAMP 	DEFAULT_GENERATED
disable 	tinyint(1) 	YES 		NULL 	


Query results operations
Current selection does not contain a unique column. Grid edit, checkbox, Edit, Copy and Delete features are not available. Documentation
Your SQL query has been executed successfully.
DESCRIBE user_role;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
user_id 	int 	NO 	MUL 	NULL 	
role_id 	int 	NO 	MUL 	NULL 	


====== Tables  ======
 appointment; 
 dentist_service;
 user; - done
 service;
 reminder; 
 schedule;
 
 
 Instructions: 
 Create CRUD that are necessary for the tables above. This is for the admin Dashboard that is found here
`Toothalie\front-e\src\Pages\Authenticated\UserDashboard.tsx`

First you need to make the necessary page to which it will be viewed by the admin in here,
`Toothalie\front-e\src\Pages\Authenticated\Panes\Admin`

Then, you request some data. So you need to create your endpoint here
`Toothalie\front-e\src\API\Authenticated\admin`

that sends a request to the backend located here
`Toothalie\back-e\src\Controller\API\Authenticated\Admin`

Note: you can also check other request for ideas. for reference you can check how i made the `AppUser`. like here `Toothalie\front-e\src\Pages\Authenticated\Panes\Admin\AppUser.tsx`


== DETAILED INSTRUCTIONS ==
- Each Page must have Create, Update, Delete, View, Filter, Search

Page 1 (appointment) - Just follow the detailed instructions above
Page 2 (Dentist) - Create a page that would link 3 tables. the `user` table where dentist id is found; the `service` table to know the services of the dentist and `dentist_service` to show the name of the dentist and its service, Follow the Detailed Instruction
Page 3 (Reminder) - Follow the detailed Instruction above
Page 4 (Schedule) - You need to link dentistid (user) and the schedule. in this way information of the tables are much readable and editable, Follow the detailed instructions above