require 'fillable_pdf_form'

class PdfsController < ApplicationController


  def create
    current_case_id = params[:current_case_id]
    current_user_id = params[:current_user_id]

    current_case = User.find(current_user_id).cases.find_by_case_id(current_case_id)

    general_information = current_case.general_information
    raise general_information.inspect
    #create new directory and output path
    new_directory = "#{Rails.root}/tmp/pdfs/#{current_case_id}"
    Dir.mkdir(new_directory) unless File.exists?(new_directory)


    #loop through options table to generate multiple forms
    current_options = current_case.options

    current_options.each do|option|
        form_included = option.include
        form_id = option.form_id
        

        if form_included
          #merge general information table with individual form tabele information 
          attributes = current_case.form_id

          raise attributes.inspect

        end
    end
     

  end 

end
