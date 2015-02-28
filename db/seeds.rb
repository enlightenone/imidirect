# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


f130 = Form.create(form_id: "i130", form_name: "I-130", description: "Petition for Alien Relative", fee: 420.00 , path: "#{Rails.root}/lib/pdf_templates/i130.pdf")
f765 = Form.create(form_id: "i765", form_name: "I-765", description: "Application For Employment Authorization", fee: 465.00 , path: "#{Rails.root}/lib/pdf_templates/i765.pdf")

applcation1 = Application.create(app_id: "f1us", description: "Spouse of US Citizens", fee: 300.00)
applcation2 = Application.create(app_id: "f2us", description: "Unmarried child of US Citizens under age 21", fee: 400.00)
applcation3 = Application.create(app_id: "f3us", description: "Unmarried son or daughter of US Citizens age 21 or older", fee: 250.00)
applcation4 = Application.create(app_id: "f4us", description: "Married son or daughter of US Citizens of any age", fee: 230.00)
applcation6 = Application.create(app_id: "f5us", description: "Siblings of US Citizens", fee: 200.00)
applcation7 = Application.create(app_id: "f1pr", description: "Spouse of Permanent Resident", fee: 250.00)
applcation8 = Application.create(app_id: "f2pr", description: "Unmarried child of Permanent Resident under age 21", fee: 450.00)
applcation9 = Application.create(app_id: "f3pr", description: "Unmarried son or daughter of Resident  age 21 or older", fee: 500.00)



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


