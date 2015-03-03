class FillablePdfForm

  attr_writer :template_path
  attr_reader :attributes

  def initialize
    fill_out
  end

  def export(output_file_path=nil)
    output_path = output_file_path || "#{Rails.root}/tmp/pdfs/#{SecureRandom.uuid}.pdf" # make sure tmp/pdfs exists
    pdftk.fill_form template_path, output_path, attributes
    output_path
  end

  def get_field_names 
    pdftk.get_field_names template_path
  end

  def template_path
    @template_path ||= "#{Rails.root}/lib/pdf_templates/test_form_2.pdf" # makes assumption about template file path unless otherwise specified
  end

  protected

  def attributes
    @attributes ||= {}
  end

  def fill(key, value)
    attributes[key.to_s] = value
  end

  def pdftk
    @pdftk ||= PdfForms.new(ENV['PDFTK_PATH'] || '/usr/local/bin/pdftk') # On my Mac, the location of pdftk was different than on my linux server.
  end

  def fill_out
    raise 'Must be overridden by child class'
  end

end


class CreatePdfForm < FillablePdfForm

  def initialize(user, template)
    @user = user
    @template = template
    super()
  end

  protected

  def template_path
    @template_path ||= "#{Rails.root}/lib/pdf_templates/#{@template}.pdf" # makes assumption about template file path unless otherwise specified
  end

  def fill_out
    # form_fields = get_field_names.map { |x| x.to_sym}
    # raise form_fields.inspect
    fill :date, Date.today.to_s
    [:first_name, :last_name, :address, :address_2, :city, :state, :zip_code].each do |field|
      fill field, @user.send(field)
    end
    fill :age, case @user.age
      
      when nil then nil
      when 0..17 then '0_17'
      when 18..34 then '18_34'
      when 35..54 then '35_54'
      else '55_plus'
    end
    fill :comments, "Hello, World"
  end
end