module CasesHelper

 def populate_database(current_case_id, user_id)
      @user = User.find(user_id)
      @current_case = @user.cases.find_by_case_id(current_case_id)
      @application_id = @current_case.application_id
      @current_case.build_general_information(general_information_params)

      # multiple forms for I-130 application
      if (1..8).include? @application_id 
        @current_case.build_i130(i130_params)
        @current_case.build_i765(i765_params) if @current_case.options.find_by(form_id: "i765").include
        @current_case.build_i485(i485_params) if @current_case.options.find_by(form_id: "i485").include
      end

      @current_case.build_i765(i765_params) if @application_id == 9
      @current_case.build_i485(i485_params) if @application_id == 10


      if @current_case.save
          @current_case_general_information = @current_case.general_information

          # Multiple form I-130 application
          if (1..8).include? @application_id 
            @current_case_i485 = @current_case.i485
            @current_case_i765 = @current_case.i765
            @current_case_i130 = @current_case.i130
          end

          @current_case_i765 = @current_case.i765 if @application_id == 9 # Employment Authorization Application
          @current_case_i485 = @current_case.i485 if @application_id == 10 # Adjustment of Status Applicatiion


          # Replace null string value with empty string in general informtion table to enable pdf form generation function
          if @current_case_general_information
             @current_case_general_information.attributes.each do |key, value|
                if @current_case_general_information[key]== "null"
                   @current_case_general_information[key] = ''
                   @current_case_general_information.save
                end
            end
          end

           # Replace null string value with empty string in I-130 table to enable pdf form generation function
          if @current_case_i130
            @current_case_i130.attributes.each do |key, value|
                if @current_case_i130[key]== "null"
                   @current_case_i130[key] = ''
                   @current_case_i130.save
                end
            end
          end

           # Replace null string value with empty string in I765 table to enable pdf form generation function
          if @current_case_i765
             @current_case_i765.attributes.each do |key, value|
                if @current_case_i765[key]== "null"
                   @current_case_i765[key] = ''
                   @current_case_i765.save
                end
            end
          end


          if @current_case_i485
            @current_case_i485.attributes.each do |key, value|
                if @current_case_i485[key]== "null"
                   @current_case_i485[key] = ''
                   @current_case_i485.save
                end
            end
          end

        render json: {log: "Form fields population successed!"}
      else
        render json: {log: "Form fields population failed!"}
      end
 end 

 def options_settings(case_id, options)
    @case = Case.find_by_case_id(case_id)
    @application_id = @case.application_id

    # Determine if the case require i-130 form for the application and assign additional I-130 option if necessary
    if (1..8).include? @application_id 
      options['i130-option'] = true 
    end

    options.each do |key, value|
      if key == 'i130-option' && value == true
        @case.options.create(form_id: "i130", form: "I-130", include: true)
      elsif key == 'i485-option' && value == true
        @case.options.create(form_id: "i485", form: "I-485", include: true)
      elsif key == 'i131-option' && value == true
        @case.options.create(form_id: "i131", form: "I-131", include: true)
      elsif key == 'i765-option' && value == true
        @case.options.create(form_id: "i765", form: "I-765", include: true)
      elsif key == 'n400-option' && value == true
        @case.options.create(form_id: "n400", form: "N-400", include: true)
      end
    end

    # In case with I-130 multiple form application,  assign each options with false for each attribute is not defined. 
    if options['i130-option'] == true 
      @case.options.create(form_id: "i130", form: "I-130", include: false) unless @case.options.find_by_form_id("i130")
      @case.options.create(form_id: "i485", form: "I-485", include: false) unless @case.options.find_by_form_id("i485")
      @case.options.create(form_id: "i131", form: "I-131", include: false) unless @case.options.find_by_form_id("i131")
      @case.options.create(form_id: "i765", form: "I-765", include: false) unless @case.options.find_by_form_id("i765")
    end
    render json:  {log: "Options pupulation successes"}
 end

end
