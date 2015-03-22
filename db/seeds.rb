# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(firstname: "Jason", lastname: "Lee", email: "larry@gmail.com", password_digest: "1234567")

f130 = Form.create(form_id: "i130", form_name: "I-130", description: "Petition for Alien Relative", fee: 420.00 , path: "#{Rails.root}/lib/pdf_templates/i130.pdf")
f765 = Form.create(form_id: "i765", form_name: "I-765", description: "Application For Employment Authorization", fee: 465.00 , path: "#{Rails.root}/lib/pdf_templates/i765.pdf")
f485 = Form.create(form_id: "i485", form_name: "I-485", description: "Application For Adjustment of Status", fee: 635.00 , path: "#{Rails.root}/lib/pdf_templates/i485.pdf")

applcation1 = Application.create(app_id: "f1us", description: "Spouse of US Citizens", fee: 300.00)
applcation2 = Application.create(app_id: "f2us", description: "Unmarried child of US Citizens under age 21", fee: 400.00)
applcation3 = Application.create(app_id: "f3us", description: "Unmarried son or daughter of US Citizens age 21 or older", fee: 250.00)
applcation4 = Application.create(app_id: "f4us", description: "Married son or daughter of US Citizens of any age", fee: 230.00)
applcation5 = Application.create(app_id: "f5us", description: "Siblings of US Citizens", fee: 200.00)
applcation6 = Application.create(app_id: "f1pr", description: "Spouse of Permanent Resident", fee: 250.00)
applcation7 = Application.create(app_id: "f2pr", description: "Unmarried child of Permanent Resident under age 21", fee: 450.00)
applcation8 = Application.create(app_id: "f3pr", description: "Unmarried son or daughter of Resident  age 21 or older", fee: 500.00)
applcation9 = Application.create(app_id: "ead", description: "Application For Employment Authorization", fee: 150.00)
applcation10 = Application.create(app_id: "aos",  description: "Application For Adjustment of Status", fee: 200.00)



AppForm.create(form_id: 1, application_id: 1)
AppForm.create(form_id: 2, application_id: 1)
AppForm.create(form_id: 1, application_id: 2)
AppForm.create(form_id: 2, application_id: 2)
AppForm.create(form_id: 1, application_id: 3)
AppForm.create(form_id: 2, application_id: 3)
AppForm.create(form_id: 1, application_id: 4)
AppForm.create(form_id: 2, application_id: 4)
AppForm.create(form_id: 1, application_id: 5)
AppForm.create(form_id: 2, application_id: 5)
AppForm.create(form_id: 1, application_id: 6)
AppForm.create(form_id: 2, application_id: 6)
AppForm.create(form_id: 1, application_id: 7)
AppForm.create(form_id: 2, application_id: 7)
AppForm.create(form_id: 1, application_id: 8)
AppForm.create(form_id: 2, application_id: 8)
AppForm.create(form_id: 2, application_id: 9)
AppForm.create(form_id: 3, application_id: 10)



Document.create(form_id: f130.id , application_id: applcation1.id , description: "A copy of your naturalization certificate or certificate of citizenship")
Document.create(form_id: f130.id , application_id: applcation2.id , description: "copy of the front and back of your permanent resident card")
Document.create(form_id: f130.id , application_id: applcation3.id , description: "A copy of your marriage certificate.")
Document.create(form_id: f130.id , application_id: applcation4.id , description:  "passport-style color photo of yourself" )
Document.create(form_id: f130.id , application_id: applcation5.id , description: "Birth certificates of children born to you")
Document.create(form_id: f130.id , application_id: applcation6.id , description: "a copy of the child  birth certificate showing both parent names and your marriage certificate")
# Document.create(form_id: f130.id , application_id: applcation7.id )
# Document.create(form_id: f130.id , application_id: applcation8.id )

Document.create(form_id: f765.id , application_id: applcation1.id , description:  "A copy of Form I-94, Arrival-Departure Record" )
Document.create(form_id: f765.id , application_id: applcation2.id , description: "A copy of your last EAD" )
Document.create(form_id: f765.id , application_id: applcation3.id , description: "A copy of your USCIS receipt notice")
# Document.create(form_id: f765.id , application_id: applcation4.id )
# Document.create(form_id: f765.id , application_id: applcation5.id )
# Document.create(form_id: f765.id , application_id: applcation6.id )
# Document.create(form_id: f765.id , application_id: applcation7.id )
# Document.create(form_id: f765.id , application_id: applcation8.id )

Document.create(form_id: f485.id , application_id: applcation1.id, description: "two identical color photographs of yourself" )
Document.create(form_id: f485.id , application_id: applcation2.id, description: "Copy of nonimmigrant visas from a U.S. Embassy or consulate abroad" )
Document.create(form_id: f485.id , application_id: applcation3.id, description: "Report of Medical Examination and Vaccination Record" )
Document.create(form_id: f485.id , application_id: applcation4.id, description: "Affidavit of Support Form I-864" )
# Document.create(form_id: f485.id , application_id: applcation5.id )
# Document.create(form_id: f485.id , application_id: applcation6.id )
# Document.create(form_id: f485.id , application_id: applcation7.id )
# Document.create(form_id: f485.id , application_id: applcation8.id )







