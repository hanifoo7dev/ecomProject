const express = require('express')
const _ = express.Router()
const { createCategory, getAllCategory, createSubCategory, getAllSubCategory, getAllCategoryWiseSubCategory, getAllOwnerWiseCategory } = require('../controllers/vendorController')
const {createPorduct,getAllProduct,getSingleProducts,getProductsByOwner,getProductsByCategory,getProductsBySubCategory,deleteProduct,bulkProducrUpload,exportProductsExcel,updateProduct,deleteMultipleImages,getSingleProduct}= require('../controllers/productController')
const multer = require('multer')

// image uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
   let uniqName = `eco-${Date.now()}`
      cb(null, uniqName + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })
// Category and SubCategory
/**
 * @swagger
 * /api/vendor/create/category:
 *   post:
 *     summary: Create a new category
 *     description: Create a new product category by providing category details.
 *     tags:
 *       - Vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: Category description
 *                 example: All types of electronic products
 *               slug:
 *                 type: string
 *                 description: Unique category slug
 *                 example: electronics
 *               isActive:
 *                 type: boolean
 *                 description: Category active status
 *                 example: true
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Category created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671a2b3c4d5e6f7890123456
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     description:
 *                       type: string
 *                       example: All types of electronic products
 *                     slug:
 *                       type: string
 *                       example: electronics
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid category data or category already exists
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Vendor access required
 *       500:
 *         description: Internal server error
 */
_.post('/create/category', createCategory)
/**
 * @swagger
 * /api/vendor/create/subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     description: Create a new subcategory under an existing category.
 *     tags:
 *       - Vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the subcategory
 *                 example: Smartphones
 *               description:
 *                 type: string
 *                 description: Subcategory description
 *                 example: All types of smartphones
 *               slug:
 *                 type: string
 *                 description: Unique subcategory slug
 *                 example: smartphones
 *               category:
 *                 type: string
 *                 description: MongoDB ObjectId of the parent category
 *                 example: 671a2b3c4d5e6f7890123456
 *               isActive:
 *                 type: boolean
 *                 description: Subcategory active status
 *                 example: true
 *     responses:
 *       201:
 *         description: Subcategory created successfully
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
 *                   example: Subcategory created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671a2b3c4d5e6f7890123457
 *                     name:
 *                       type: string
 *                       example: Smartphones
 *                     description:
 *                       type: string
 *                       example: All types of smartphones
 *                     slug:
 *                       type: string
 *                       example: smartphones
 *                     category:
 *                       type: string
 *                       example: 671a2b3c4d5e6f7890123456
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid subcategory data or category ID
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Vendor access required
 *       404:
 *         description: Parent category not found
 *       500:
 *         description: Internal server error
 */
_.post('/create/subcategory', createSubCategory)



// *********************** Products ************************


// create product
/**
 * @swagger
 * /api/product/create/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with multiple product images.
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - sku
 *               - slug
 *               - photo
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Gaming Desktop PC"
 *               description:
 *                 type: string
 *                 example: "High-performance desktop for gaming and development"
 *               shortDescription:
 *                 type: string
 *                 example: "Powerful gaming desktop"
 *               sku:
 *                 type: string
 *                 example: "GPC-001"
 *               slug:
 *                 type: string
 *                 example: "gaming-desktop-pc"
 *               price:
 *                 type: number
 *                 example: 85000
 *               discountPrice:
 *                 type: number
 *                 example: 79999
 *               stock:
 *                 type: integer
 *                 example: 10
 *               status:
 *                 type: string
 *                 enum: [approve, rejected, pending]
 *                 example: pending
 *               category:
 *                 type: string
 *                 description: Category MongoDB ObjectId
 *                 example: "671a2b3c4d5e6f7890123456"
 *               subCategory:
 *                 type: string
 *                 description: Subcategory MongoDB ObjectId
 *                 example: "671a2b3c4d5e6f7890123457"
 *               photo:
 *                 type: array
 *                 description: Upload multiple product images
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123458"
 *                     title:
 *                       type: string
 *                       example: "Gaming Desktop PC"
 *                     sku:
 *                       type: string
 *                       example: "GPC-001"
 *                     slug:
 *                       type: string
 *                       example: "gaming-desktop-pc"
 *                     price:
 *                       type: number
 *                       example: 85000
 *                     stock:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Invalid product data or missing required fields
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
_.post('/create/product',upload.array('photo'),createPorduct)
// ************************
/**
 * @swagger
 * /api/product/bulk/products:
 *   post:
 *     summary: Bulk upload products
 *     description: Upload an Excel or CSV file to create multiple products at once.
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Excel (.xlsx, .xls) or CSV file containing product data.
 *     responses:
 *       200:
 *         description: Products uploaded successfully
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
 *                   example: "Products uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 10
 *                     inserted:
 *                       type: integer
 *                       example: 8
 *                     failed:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Missing file or invalid file format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
_.post('/bulk/products',upload.single('file'),bulkProducrUpload)
// *********************
/**
 * @swagger
 * /api/product/singal/product/upload/{id}:
 *   post:
 *     summary: Update an existing product
 *     description: Update product information and upload multiple product images using product ID.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Gaming Desktop PC"
 *               description:
 *                 type: string
 *                 example: "High-performance desktop for gaming and development"
 *               shortDescription:
 *                 type: string
 *                 example: "Powerful gaming desktop"
 *               sku:
 *                 type: string
 *                 example: "GPC-001"
 *               slug:
 *                 type: string
 *                 example: "gaming-desktop-pc"
 *               price:
 *                 type: number
 *                 example: 85000
 *               discountPrice:
 *                 type: number
 *                 example: 79999
 *               stock:
 *                 type: integer
 *                 example: 10
 *               status:
 *                 type: string
 *                 enum: [approve, rejected, pending]
 *                 example: pending
 *               category:
 *                 type: string
 *                 description: Category MongoDB ObjectId
 *                 example: "671a2b3c4d5e6f7890123456"
 *               subCategory:
 *                 type: string
 *                 description: Subcategory MongoDB ObjectId
 *                 example: "671a2b3c4d5e6f7890123457"
 *               photo:
 *                 type: array
 *                 description: Upload multiple product images
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: "Product updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123456"
 *                     title:
 *                       type: string
 *                       example: "Gaming Desktop PC"
 *                     price:
 *                       type: number
 *                       example: 85000
 *                     stock:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Invalid product ID or product data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
_.post('/single/product/upload/:id',upload.array('photo'),updateProduct)
// ***************************************
/**
 * @swagger
 * /api/product/product/{id}/images:
 *   delete:
 *     summary: Delete multiple product images
 *     description: Delete multiple images from a specific product using product ID and image URLs.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageUrls
 *             properties:
 *               imageUrls:
 *                 type: array
 *                 description: List of image URLs to delete from the product
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://example.com/images/product-1.jpg"
 *                   - "https://example.com/images/product-2.jpg"
 *     responses:
 *       200:
 *         description: Product images deleted successfully
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
 *                   example: "Product images deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123456"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             example: "https://example.com/images/product-3.jpg"
 *                           isMain:
 *                             type: boolean
 *                             example: true
 *       400:
 *         description: Invalid product ID or image URLs
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product or images not found
 *       500:
 *         description: Internal server error
 */
_.delete("/product/:id/images", deleteMultipleImages);
// **********************************
/**
 * @swagger
 * /api/product/bulk/upload/products:
 *   get:
 *     summary: Export all products to Excel
 *     description: Download all product records as an Excel (.xlsx) file.
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Excel file generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Unable to export products
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
_.get('/bulk/upload/products',exportProductsExcel)
// ************************

// *****************************
/**
 * @swagger
 * /api/product/product/{id}:
 *   get:
 *     summary: Get a single product
 *     description: Retrieve a specific product using its MongoDB ObjectId.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
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
 *                   example: "Product retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123456"
 *                     title:
 *                       type: string
 *                       example: "Gaming Desktop PC"
 *                     description:
 *                       type: string
 *                       example: "High-performance desktop for gaming and development"
 *                     shortDescription:
 *                       type: string
 *                       example: "Powerful gaming desktop"
 *                     sku:
 *                       type: string
 *                       example: "GPC-001"
 *                     slug:
 *                       type: string
 *                       example: "gaming-desktop-pc"
 *                     price:
 *                       type: number
 *                       example: 85000
 *                     discountPrice:
 *                       type: number
 *                       example: 79999
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     status:
 *                       type: string
 *                       enum: [approve, rejected, pending]
 *                       example: pending
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             example: "https://example.com/images/product.jpg"
 *                           isMain:
 *                             type: boolean
 *                             example: true
 *                     category:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123456"
 *                     subCategory:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123457"
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
_.get('/product/:id',getSingleProducts)
// *****************************
/**
 * @swagger
 * /api/product/owner/{ownerId}:
 *   get:
 *     summary: Get all products by owner
 *     description: Retrieve all products created by a specific vendor/owner using their MongoDB ObjectId.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: Vendor/Owner MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Owner products retrieved successfully
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
 *                   example: "Owner products retrieved successfully"
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
 *       400:
 *         description: Invalid owner ID
 *       404:
 *         description: Owner or products not found
 *       500:
 *         description: Internal server error
 */
_.get('/owner/:ownerId',getProductsByOwner)
// *************************************
/**
 * @swagger
 * /api/product/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieve all products belonging to a specific category using the category MongoDB ObjectId.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: Category MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Products retrieved successfully by category
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
 *                   example: "Products retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123457"
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
 *                         example: "671a2b3c4d5e6f7890123458"
 *       400:
 *         description: Invalid category ID
 *       404:
 *         description: Category or products not found
 *       500:
 *         description: Internal server error
 */
_.get('/category/:categoryId',getProductsByCategory)
// ********************************
/**
 * @swagger
 * /api/product/subcategory/{subcategoryId}/:
 *   get:
 *     summary: Get products by subcategory
 *     description: Retrieve all products belonging to a specific subcategory using its MongoDB ObjectId.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         description: Subcategory MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Products retrieved successfully by subcategory
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
 *                   example: "Products retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123457"
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
 *                         example: "671a2b3c4d5e6f7890123458"
 *                       subCategory:
 *                         type: string
 *                         example: "671a2b3c4d5e6f7890123456"
 *       400:
 *         description: Invalid subcategory ID
 *       404:
 *         description: Subcategory or products not found
 *       500:
 *         description: Internal server error
 */
_.get('/subcategory/:subcategoryId/',getProductsBySubCategory)
// ***************************
/**
 * @swagger
 * /api/product/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a specific product using its MongoDB ObjectId.
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "671a2b3c4d5e6f7890123456"
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: "Product deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "671a2b3c4d5e6f7890123456"
 *                     title:
 *                       type: string
 *                       example: "Gaming Desktop PC"
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
_.delete('/:productId',deleteProduct)




module.exports = _