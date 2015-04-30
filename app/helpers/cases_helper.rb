module CasesHelper

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
