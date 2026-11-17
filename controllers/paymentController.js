let axios = require('axios');
let Card = require('../models/cardSchema')
let Product = require('../models/productSchema')
let Coupon = require('../models/couponSchema')

let paymentController = async (req, res) => {

  let { desc,cus_name, cus_email, cus_add1, cus_add2, cus_city, cus_state, cus_postcode, cus_phone,owner,coupon } = req.body;  
  let findCart = await Card.find({owner: owner}).populate('productId');
  let total = 0;
  findCart.map((item) => {
  if(item.productId.discountType == 'percent'){
    let afterDiscount = ((item.productId.price * item.productId.discountPrice) / 100) * item.quantity;
     total += afterDiscount;
    }else{
      let afterDiscount = (item.productId.price - item.productId.discountPrice) * item.quantity;
      total += afterDiscount;
    }
  })
  if(coupon){
    let existingCoupon = await Coupon.findOne({code: coupon});
    if(!existingCoupon){
      return res.status(404).json({
        success: false,
        message: "Coupon not found"
      });
    }
    if(total < existingCoupon.minimumAmount){
      return res.status(400).json({
        success: false,
        message: "Total amount is less than the minimum amount for this coupon"
      });
    }
 
    if(existingCoupon.couponType == 'percent'){
      let afterDiscount = total * existingCoupon.couponAmount / 100;
      total = +total - afterDiscount;
    }else{
      let afterDiscount = item.productId.price - existingCoupon.couponAmount;
      total = +total - afterDiscount;
    }
  }
 

try {
    const paymentData = {
      store_id: "aamarpaytest",
      tran_id: Date.now().toString(),
      success_url: "http://www.merchantdomain.com/successpage.html",
      fail_url: "http://www.merchantdomain.com/failedpage.html",
      cancel_url: "http://www.merchantdomain.com/cancelpage.html",
      amount: total,
      currency: "BDT",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      desc: desc,
      cus_name: cus_name,
      cus_email: cus_email,
      cus_add1: cus_add1,
      cus_add2: cus_add2,
      cus_city: cus_city,
      cus_state: cus_state,
      cus_postcode: cus_postcode,
      cus_country: "Bangladesh",
      cus_phone: cus_phone,
      type: "json",
    };

    const response = await axios.post(
      "https://sandbox.aamarpay.com/jsonpost.php",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment initialized successfully",
      data: response.data,
    });

  } catch (error) {
    console.error("Payment Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Payment initialization failed",
      error: error.response?.data || error.message,
    });
  }
};





module.exports = {paymentController}