DESCRIBE appointment_type;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
appointment_name 	varchar(50) 	YES 		NULL 	

DESCRIBE appointment;
[ Edit inline ] [ Edit ] [ Create PHP code ]
Field 	Type 	Null 	Key 	Default 	Extra 	
id 	int 	NO 	PRI 	NULL 	auto_increment
appointment_date 	datetime 	NO 		CURRENT_TIMESTAMP 	DEFAULT_GENERATED
emergency 	tinyint(1) 	YES 		NULL 	
user_set_date 	varchar(50) 	YES 		NULL 	
status 	varchar(50) 	YES 		NULL 	
message 	varchar(200) 	YES 		NULL 	
deleted_on 	datetime 	YES 		NULL 	
patient_id 	int 	NO 	MUL 	NULL 	
dentist_id 	int 	NO 	MUL 	NULL 	
schedule_id 	int 	NO 	MUL 	NULL 	
appointment_type_id 	int 	YES 	MUL 	NULL 	
service_id 	int 	YES 	MUL 	NULL 	



<goal>
    you are to fix the appointmentModal.tsx in front end and make the appointmentType show accordingly from db and not hard coded
</goal>

<importantnote>
    the emergency is not included in the appointment type. the appointment type has only 2 options as of now, the "Normal" and "Family" Booking
</importantnote>