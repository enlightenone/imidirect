class PaymentsController < ApplicationController
  
  def index
  end

  def new
      @user = User.first
      @case = @user.cases(1)
  end

  def create
    @amount = 120000

    customer = Stripe::Customer.create(
      :email => 'test@email.com',
      :card  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => "Test",
      :currency    => 'usd'
    )

    respond_to do |format|
      if @membership.save
        format.html { redirect_to @membership, notice: "Membership was successfully created for #{@membership.name}." }
      else
        format.html { render :new }
      end
    end

  rescue Stripe::CardError => e
    flash[:notice] = e.message
    redirect_to new_membership_path
  end

end
