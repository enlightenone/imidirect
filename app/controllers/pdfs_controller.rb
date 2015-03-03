require 'fillable_pdf_form'

class PdfsController < ApplicationController


  def create
    current_case_id = params[:current_case_id]
    current_user_id = params[:current_user_id]

    current_case = User.find(current_user_id).cases.find_by_case_id(current_case_id)

   

    #create new directory and output path
    new_directory = "#{Rails.root}/tmp/pdfs/#{current_case_id}"
    Dir.mkdir(new_directory) unless File.exists?(new_directory)

    





      # user = { date: Date.today.to_s, first_name: "Jason", last_name: "Lee", address: "1234 St",  address_2: "ste 3", city: "alhambra", state: "CA", zip_code: "91803",  age: '0_17', comments: "Hello, World"}
    send_file TestPdfForm.new(@user, @template).export, type: 'application/pdf', disposition: 'inline'
    # TestPdfForm.new(user, "test_form").export
  end 

end
