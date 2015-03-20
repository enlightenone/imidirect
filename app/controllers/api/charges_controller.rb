module Api
  class ChargesController < ApplicationController
    def index

    end

    def new      
    end

    def create

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

      # combined pdf file path
        @combined_pdf_path = "#{Rails.root}/tmp/pdfs/5ac829dfc8c1455a058a58f9392cb476/5ac829dfc8c1455a058a58f9392cb476_combined.pdf"


        # render combined pdf file to browser
        send_file @combined_pdf_path, type: 'application/pdf', disposition: 'inline'
        # redirect_to "http://yahoo.com"

  rescue Stripe::CardError => e
    flash[:notice] = e.message
    redirect_to "http://facebook.com"
  end

  end
end