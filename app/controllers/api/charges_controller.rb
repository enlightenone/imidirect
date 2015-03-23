module Api
  class ChargesController < ApplicationController

    def show
      #pull fees information from database

      @case_id = params[:case_id]

      # @case = Case.find_by_case_id(@case_id)
      render json:  {result: @case_id}
    end

    def create
      @current_case_id = params[:current_case_id]

    @amount = 155000

    customer = Stripe::Customer.create(
      :email => 'schow617@yahoo.com',
      :card  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => "Test",
      :currency    => 'usd'
    )


   @user = User.find(1)
      @current_case_id = '85ca593dda42ad89bfdf4155618f4071'
      @current_case = @user.cases.find_by_case_id(@current_case_id)

    if @current_case

        #generate pdf files

        #create new directory and output path
        @new_directory = "#{Rails.root}/tmp/pdfs/#{@current_case_id}"
        Dir.mkdir(@new_directory) unless File.exists?(@new_directory)

        current_options = @current_case.options

         ####block to generate pdf form###
         def pdftk
            @pdftk ||= PdfForms.new(ENV['PDFTK_PATH'] || '/usr/local/bin/pdftk') # On my Mac, the location of pdftk was different than on my linux server.
         end
         ###### end of block ############

        def generate(new_directory, form, attributes, case_id)

            template_path =  "#{Rails.root}/lib/pdf_templates/#{form}.pdf" 
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
        combined_pdf_path = "#{Rails.root}/tmp/pdfs/#{@current_case_id}/#{@current_case_id}_combined.pdf"

        # generate combined pdf file
        combined_pdf_file.save combined_pdf_path

        # render combined pdf file to browser
        send_file combined_pdf_path, type: 'application/pdf', disposition: 'inline'


    # End of PDF block

    else
      redirect_to "http://facebook.com"
    end

  rescue Stripe::CardError => e
    flash[:notice] = e.message
    redirect_to "http://facebook.com"
  end

  end
end