
let User = require('../models/userSchema');
let Coupon = require('../models/couponSchema');

let createCoupon = async (req, res) => {
    try {
        let {code,couponType,couponAmount,minimumAmount,owner} = req.body;

        // Check required fields
        if (!code || !couponType || !couponAmount || !owner) {
            return res.status(400).json({
                success: false,
                message: "All required fields are necessary"
            });
        }

        // Check existing coupon
        let existingCoupon = await Coupon.findOne({code: code});

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: "Coupon already exists"
            });
        }

        // Find user
        let user = await User.findOne({_id: owner});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check vendor role
        if (user.role !== 'vendor') {
            return res.status(403).json({
                success: false,
                message: "Only vendors can create coupons"
            });
        }

        // Create coupon
        let coupon = new Coupon({
            code: code,
            couponType: couponType,
            couponAmount: couponAmount,
            minimumAmount: minimumAmount ? minimumAmount : minimumAmount*3,
            // minimumAmount: minimumAmount || 0,
            owner: owner
        });

        await coupon.save();

        return res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon
        });

    } catch (error) {
        console.log("Create Coupon Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = { createCoupon };
