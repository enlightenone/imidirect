require 'SecureRandom' #set random 
include ParamsHelper # parameters helper
include CasesHelper


module Api 
  class CasesController < ApplicationController


    def index
     @result = params[:passedparams]
      render json: @result
    end

    def new

    end

    def populate
      @user_id = 1
      @current_case_id = params[:id]
      populate_database(@current_case_id, @user_id)

      # @current_case.build_general_information(general_information_params)
      # @current_case.build_i130(i130_params)
      # @current_case.build_i765(i765_params) if @current_case.options.find_by(form_id: "i765").include
      # @current_case.build_i485(i485_params) if @current_case.options.find_by(form_id: "i485").include

      # if @current_case.save
      #     @current_case_general_information = @current_case.general_information
      #     @current_case_i485 = @current_case.i485
      #     @current_case_i765 = @current_case.i765
      #     @current_case_i130 = @current_case.i130


      #     # Replace null string value with empty string in general informtion table to enable pdf form generation function
      #     if @current_case_general_information
      #       @current_case_general_information.attributes.each do |key, value|
      #           if @current_case_general_information[key]== "null"
      #              @current_case_general_information[key] = ''
      #              @current_case_general_information.save
      #           end
      #       end
      #     end

      #      # Replace null string value with empty string in I765 table to enable pdf form generation function
      #     if @current_case_i765
      #        @current_case_i765.attributes.each do |key, value|
      #           if @current_case_i765[key]== "null"
      #              @current_case_i765[key] = ''
      #              @current_case_i765.save
      #           end
      #       end
      #     end

      #      # Replace null string value with empty string in I-130 table to enable pdf form generation function
      #     if @current_case_i130
      #       @current_case_i130.attributes.each do |key, value|
      #           if @current_case_i130[key]== "null"
      #              @current_case_i130[key] = ''
      #              @current_case_i130.save
      #           end
      #       end
      #     end

      #     if @current_case_i485
      #       @current_case_i485.attributes.each do |key, value|
      #           if @current_case_i485[key]== "null"
      #              @current_case_i485[key] = ''
      #              @current_case_i485.save
      #           end
      #       end
      #     end

      #   render json: {log: "Form fields population successed!"}
      # else
      #   render json: {log: "Form fields population failed!"}
      # end

    end

    def option
      @case_id = params[:case_id]
      @options = JSON.parse(params[:options])
      options_settings(@case_id, @options)
    end
 
private
    # strong parameters to populate 
    def general_information_params
        g_params("general")
    end

    def i130_params
        g_params("i130")
    end

    def i765_params
       g_params("i765")
    end

    def i485_params
       g_params("i485")                                    
    end

  end
end