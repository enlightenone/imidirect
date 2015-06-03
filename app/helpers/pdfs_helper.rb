module PdfsHelper

  def pdf_generator(user_id, current_case_id)

        @user = User.find(user_id)
        @current_case = @user.cases.find_by_case_id(current_case_id)

        #generate pdf files
        #create new directory and output path
        #update
        # @new_directory = "#{Rails.root}/tmp/pdfs/#{@current_case_id}"
        @new_directory = "/app/tmp/pdfs/#{@current_case_id}"
        Dir.mkdir(@new_directory) unless File.exists?(@new_directory)

        current_options = @current_case.options

         ####block to generate pdf form###
         def pdftk
            @pdftk ||= PdfForms.new(ENV['PDFTK_PATH'] || '/app/vendor/pdftk/bin/pdftk') # On my Mac, the location of pdftk was different than on my linux server.
         end
         ###### end of block ############

        def generate(new_directory, form, attributes, case_id)

            template_path =  "/app/lib/pdf_templates/#{form}.pdf" 
            output_path = "#{@new_directory}/#{case_id}_#{form}.pdf" # make sure tmp/pdfs exists
            pdftk.fill_form template_path, output_path, attributes
            output_path
        end

        #instantiate combined pdf object
        combined_pdf_file = CombinePDF.new

        ###### List of Documentation ############

        list_of_documents_pdf = Prawn::Document.new # instantiate Prawn object
        list_of_documents_pdf.text "List of Documentation", :align => :center, :size => 25  # List of Documentation Header
        list_of_documents_pdf.stroke_horizontal_rule # List of Documentation Header
        list_of_documents_pdf.move_down 20;

    
        current_options.each do |option|  # To identify which form is included
            form_included = option.include
            form_id = option.form_id
            documents = Document.all # documents information

            case form_id   # Assign form table id 
                when "i130"
                    form_table_id = 1
                when "i765"
                    form_table_id = 2
                when "i485"
                    form_table_id = 3
                else
                    puts "Error Message"
            end

            # generate list of documents based on form

            if form_included
                documents.each do |document|
                    if form_table_id === document.form_id 
                        list_of_documents_pdf.text "- #{document.description}", :size =>12
                    end
                end
            end
        end

        list_of_documents_pdf.render_file "#{@new_directory}/#{@current_case_id}_list_of_document.pdf"

        combined_pdf_file << CombinePDF.new("#{@new_directory}/#{@current_case_id}_list_of_document.pdf") 
        ###### End of List of Documentation #########

        ####  PDF Form generation Block #####
        current_options.each do |option|
            form_included = option.include
            form_id = option.form_id
            
            if form_included
              #merge general information table with individual form table information
              general_information = @current_case.general_information
              
              specific_case_attributes =  @current_case.send(form_id)

              general_information = general_information.serializable_hash 
              specific_case_attributes = specific_case_attributes.serializable_hash 
              attributes = general_information.merge(specific_case_attributes)


            ####block to generate pdf form###
            prefilled_pdf_file = generate(@new_directory, form_id, attributes, @current_case_id )
            ###### end of block ############
        
            #add prefiled 
            combined_pdf_file << CombinePDF.new(prefilled_pdf_file) 

            ######## end of block ############
            end
        end

        ####  End of PDF Form generation Block #####

        # combined pdf file path
        combined_pdf_path = "/app/tmp/pdfs/#{@current_case_id}/#{@current_case_id}_combined.pdf"

        # generate combined pdf file
        combined_pdf_file.save combined_pdf_path

        # render combined pdf file to browser
        send_file combined_pdf_path, type: 'application/pdf', disposition: 'inline'


    # End of PDF block

  end
end