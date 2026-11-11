const express = require('express')
const _ = express.Router()
const {getAllUser} = require('../controllers/userController')
const {getAllProduct,getSingleProduct}= require('../controllers/productController')
const { getAllCategory, getAllSubCategory, getAllCategoryWiseSubCategory, getAllOwnerWiseCategory } = require('../controllers/vendorController')
const { createCard,increDecre,getCard } = require('../controllers/cardController')
const { paymentController } = require('../controllers/paymentController')

// _.get('/allusers',getAllUser)
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 671a2b3c4d5e6f7890123456
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@gmail.com
 *                       role:
 *                         type: string
 *                         example: user
 *       500:
 *         description: Internal server error
 */
_.get('/allusers',getAllUser);
/**
 * @swagger
 * /api/product/all/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products with their details.
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All products retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123456"
 *                       title:
 *                         type: string
 *                         example: "Gaming Desktop PC"
 *                       description:
 *                         type: string
 *                         example: "High-performance desktop for gaming and development"
 *                       shortDescription:
 *                         type: string
 *                         example: "Powerful gaming desktop"
 *                       sku:
 *                         type: string
 *                         example: "GPC-001"
 *                       slug:
 *                         type: string
 *                         example: "gaming-desktop-pc"
 *                       price:
 *                         type: number
 *                         example: 85000
 *                       discountPrice:
 *                         type: number
 *                         example: 79999
 *                       stock:
 *                         type: integer
 *                         example: 10
 *                       status:
 *                         type: string
 *                         enum: [approve, rejected, pending]
 *                         example: pending
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             url:
 *                               type: string
 *                               example: "https://example.com/images/product.jpg"
 *                             isMain:
 *                               type: boolean
 *                               example: true
 *                       category:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123456"
 *                       subCategory:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123457"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
_.get('/all/product',getAllProduct)
// singal product by slug
_.get('/single/product/:slug',getSingleProduct)
/**
 * @swagger
 * /api/vendor/all/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all available categories from the database.
 *     tags:
 *       - Vendor
 *     responses:
 *       200:
 *         description: All categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All categories fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 671a2b3c4d5e6f7890123456
 *                       name:
 *                         type: string
 *                         example: Electronics
 *                       slug:
 *                         type: string
 *                         example: electronics
 *                       description:
 *                         type: string
 *                         example: All electronic products
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Vendor access required
 *       500:
 *         description: Internal server error
 */
_.get('/all/category', getAllCategory)
/**
 * @swagger
 * /api/vendor/all/subcategory:
 *   get:
 *     summary: Get all subcategories
 *     description: Retrieve all available subcategories from the database.
 *     tags:
 *       - Vendor
 *     responses:
 *       200:
 *         description: All subcategories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All subcategories fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 671a2b3c4d5e6f7890123456
 *                       name:
 *                         type: string
 *                         example: Smartphones
 *                       slug:
 *                         type: string
 *                         example: smartphones
 *                       description:
 *                         type: string
 *                         example: All types of smartphones
 *                       category:
 *                         type: string
 *                         example: 671a2b3c4d5e6f7890123457
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Vendor access required
 *       500:
 *         description: Internal server error
 */
_.get('/all/subcategory', getAllSubCategory)
/**
 * @swagger
 * /api/vendor/all/category/{id}/subcategory:
 *   get:
 *     summary: Get all subcategories by category ID
 *     description: Retrieve all subcategories associated with a specific category.
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Subcategories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Subcategories retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123456"
 *                       name:
 *                         type: string
 *                         example: "Smartphones"
 *                       slug:
 *                         type: string
 *                         example: "smartphones"
 *                       description:
 *                         type: string
 *                         example: "Smartphones and mobile devices"
 *                       category:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123456"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Invalid category ID
 *       404:
 *         description: Category or subcategories not found
 *       500:
 *         description: Internal server error
 */
_.get('/all/category/:id/subcategory', getAllCategoryWiseSubCategory)
/**
 * @swagger
 * /api/vendor/all/user/{id}/category:
 *   get:
 *     summary: Get all categories by vendor ID
 *     description: Retrieve all categories created by a specific vendor/user.
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vendor/User MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Categories retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123456"
 *                       name:
 *                         type: string
 *                         example: "Electronics"
 *                       slug:
 *                         type: string
 *                         example: "electronics"
 *                       description:
 *                         type: string
 *                         example: "Electronic products category"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User or categories not found
 *       500:
 *         description: Internal server error
 */
_.get('/all/user/:id/category', getAllOwnerWiseCategory)
// create add to card
_.post('/create/cart', createCard)
// add to card
_.post('/cart/incredecre', increDecre)
_.get('/get/cart', getCard)

// payment
_.post('/payment',paymentController )



module.exports = _