// 1. Static Appointment Types
export const appointmentTypeRes = {
  data: [
    { id: 1, appointment_name: "Normal" },
    { id: 2, appointment_name: "Family" }
  ]
};

// 2. Static Services (Combined with Service Types from DB)
export const servicesRes = {
  data: [
    { service_id: 1, service_name: "Routine Checkup & Cleaning", service_type_id: 1, serviceTypeId: 1, serviceTypeName: "General Dentistry" },
    { service_id: 2, service_name: "Dental X-Ray (Panoramic)", service_type_id: 1, serviceTypeId: 1, serviceTypeName: "General Dentistry" },
    { service_id: 3, service_name: "Fluoride Treatment", service_type_id: 1, serviceTypeId: 1, serviceTypeName: "General Dentistry" },
    { service_id: 4, service_name: "Child Dental Exam", service_type_id: 2, serviceTypeId: 2, serviceTypeName: "Pediatric Dentistry" },
    { service_id: 5, service_name: "Sealants", service_type_id: 2, serviceTypeId: 2, serviceTypeName: "Pediatric Dentistry" },
    { service_id: 6, service_name: "Braces Consultation", service_type_id: 3, serviceTypeId: 3, serviceTypeName: "Orthodontics" },
    { service_id: 7, service_name: "Invisalign Adjustment", service_type_id: 3, serviceTypeId: 3, serviceTypeName: "Orthodontics" },
    { service_id: 8, service_name: "Retainer Fitting", service_type_id: 3, serviceTypeId: 3, serviceTypeName: "Orthodontics" },
    { service_id: 9, service_name: "Teeth Whitening", service_type_id: 4, serviceTypeId: 4, serviceTypeName: "Cosmetic Dentistry" },
    { service_id: 10, service_name: "Veneers Consultation", service_type_id: 4, serviceTypeId: 4, serviceTypeName: "Cosmetic Dentistry" },
    { service_id: 11, service_name: "Composite Bonding", service_type_id: 4, serviceTypeId: 4, serviceTypeName: "Cosmetic Dentistry" },
    { service_id: 12, service_name: "Wisdom Tooth Extraction", service_type_id: 5, serviceTypeId: 5, serviceTypeName: "Oral Surgery" },
    { service_id: 13, service_name: "Dental Implant Surgery", service_type_id: 5, serviceTypeId: 5, serviceTypeName: "Oral Surgery" },
    { service_id: 14, service_name: "Deep Cleaning (Scaling)", service_type_id: 6, serviceTypeId: 6, serviceTypeName: "Periodontics" },
    { service_id: 15, service_name: "Gum Graft Surgery", service_type_id: 6, serviceTypeId: 6, serviceTypeName: "Periodontics" }
  ]
};

// 3. Static Dentists (Mapped to match your requested structure)
export const dentistRes = {
  status: "ok",
  dentists: [
    {
      id: 101,
      email: "mikaela.reyes@toothalie.com",
      username: "dr_mikaela",
      first_name: "Mikaela",
      last_name: "Reyes",
      roles: '["ROLE_DENTIST"]',
      specialization: "Prosthodontics",
      experience: "3 years",
      image: "dentist1", // Make sure to map this to your actual import in React
      schedule: {
        Monday: ["09:00-10:00", "10:00-11:00"],
        Wednesday: ["13:00-14:00"]
      },
      services: [
        servicesRes.data[0], // Routine Checkup
        servicesRes.data[12] // Dental Implant
      ]
    },
    {
      id: 102,
      email: "olivia.bennett@toothalie.com",
      username: "dr_olivia",
      first_name: "Olivia",
      last_name: "Bennett",
      roles: '["ROLE_DENTIST"]',
      specialization: "Cosmetic Dentistry & Veneers",
      experience: "7 years",
      image: "dentist2",
      schedule: {
        Tuesday: ["09:00-10:00"],
        Thursday: ["14:00-15:00", "15:00-16:00"]
      },
      services: [
        servicesRes.data[8], // Teeth Whitening
        servicesRes.data[9], // Veneers
        servicesRes.data[10] // Composite Bonding
      ]
    },
    {
      id: 103,
      email: "jamie.anderson@toothalie.com",
      username: "dr_jamie",
      first_name: "Jamie",
      last_name: "Anderson",
      roles: '["ROLE_DENTIST"]',
      specialization: "Implantology",
      experience: "5 years",
      image: "dentist3",
      schedule: {
        Monday: ["11:00-12:00"],
        Friday: ["09:00-10:00"]
      },
      services: [
        servicesRes.data[11], // Wisdom Tooth
        servicesRes.data[12]  // Dental Implant
      ]
    },
    {
      id: 104,
      email: "sophia.martinez@toothalie.com",
      username: "dr_sophia",
      first_name: "Sophia",
      last_name: "Martinez",
      roles: '["ROLE_DENTIST"]',
      specialization: "Orthodontics (Aligners)",
      experience: "5 years",
      image: "dentist4",
      schedule: {
        Wednesday: ["09:00-10:00", "10:00-11:00"],
        Saturday: ["10:00-12:00"]
      },
      services: [
        servicesRes.data[5], // Braces Consult
        servicesRes.data[6], // Invisalign
        servicesRes.data[7]  // Retainer
      ]
    },
    {
      id: 105,
      email: "hana.sy@toothalie.com",
      username: "dr_hana",
      first_name: "Hana",
      last_name: "Sy",
      roles: '["ROLE_DENTIST"]',
      specialization: "Endodontics",
      experience: "9 years",
      image: "dentist5",
      schedule: {
        Tuesday: ["13:00-14:00"],
        Thursday: ["09:00-10:00"]
      },
      services: [
        servicesRes.data[0], // Routine
        servicesRes.data[1]  // X-Ray
      ]
    },
    {
      id: 106,
      email: "liana.chen@toothalie.com",
      username: "dr_liana",
      first_name: "Liana",
      last_name: "Chen",
      roles: '["ROLE_DENTIST"]',
      specialization: "Periodontics",
      experience: "6 years",
      image: "dentist6",
      schedule: {
        Monday: ["14:00-15:00"],
        Friday: ["13:00-15:00"]
      },
      services: [
        servicesRes.data[13], // Deep Cleaning
        servicesRes.data[14]  // Gum Graft
      ]
    }
  ]
};