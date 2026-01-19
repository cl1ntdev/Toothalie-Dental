SELECT * FROM service LIMIT 3;
Profiling [ Edit inline ] [ Edit ] [ Explain SQL ] [ Create PHP code ] [ Refresh ]
Full texts
	id 	name 	service_type_id 	
	Edit Edit 	Copy Copy 	Delete Delete 	1 	Routine Checkup & Cleaning 	1
	Edit Edit 	Copy Copy 	Delete Delete 	2 	Dental X-Ray (Panoramic) 	1
	Edit Edit 	Copy Copy 	Delete Delete 	3 	Fluoride Treatment 	1


SELECT * FROM service_type LIMIT 3;
Profiling [ Edit inline ] [ Edit ] [ Explain SQL ] [ Create PHP code ] [ Refresh ]
Full texts
	id 	name 	
	Edit Edit 	Copy Copy 	Delete Delete 	1 	General Dentistry
	Edit Edit 	Copy Copy 	Delete Delete 	2 	Pediatric Dentistry
	Edit Edit 	Copy Copy 	Delete Delete 	3 	Orthodontics


SELECT * FROM appointment_type LIMIT 3;
Profiling [ Edit inline ] [ Edit ] [ Explain SQL ] [ Create PHP code ] [ Refresh ]
Full texts
	id 	appointment_name 	
	Edit Edit 	Copy Copy 	Delete Delete 	1 	Normal
	Edit Edit 	Copy Copy 	Delete Delete 	2 	Family


SELECT * FROM role LIMIT 3;
Profiling [ Edit inline ] [ Edit ] [ Explain SQL ] [ Create PHP code ] [ Refresh ]
Full texts
	id 	role_name 	
	Edit Edit 	Copy Copy 	Delete Delete 	1 	PATIENT
	Edit Edit 	Copy Copy 	Delete Delete 	2 	ADMIN
	Edit Edit 	Copy Copy 	Delete Delete 	3 	DENTIST 


<goal>
    You are to create a crud function for the admin panel. You may create new file in the backend that handles the crud for the admin and create new panes that handles the UI crud. You can look at other files on the admin for reference. the sample data are given above from db
</goal>