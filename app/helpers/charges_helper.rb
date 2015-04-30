module ChargesHelper

  def fees_summary_display(case_id)

      @case = Case.find_by_case_id(case_id)
      @application_fee = @case.application.fee
      @app_description = @case.application.description
      @options = @case.options
      @fees = [{description: "Online Process Fee", fee: @application_fee}]

      # loop through options table to determine fee of additional form to be included.
      @options.each do |option| 
        if option.include == true
          if @case.application.forms.find_by_form_id(option.form_id)
            @fee =  @case.application.forms.find_by_form_id(option.form_id).fee
            @description =  @case.application.forms.find_by_form_id(option.form_id).description
            @fees.push({description: @description, fee: @fee})
          end
        end
      end

      @total_fee = 0

      @fees.each do |f|
        @total_fee += f[:fee]
      end

      #store total fee amount to cases database
      @case.update(total: @total_fee)
      # @fees_summary = {total_fee: @total_fee, sub_total_fees: @fees}
      @fees_summary = {total_fee: @total_fee, sub_total_fees: @fees}
    ################# End of Fee Pulling Function #######################

    return @fees_summary.to_json

  end

end
