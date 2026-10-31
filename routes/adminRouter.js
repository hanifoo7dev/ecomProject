const express = require('express')
const _ = express.Router()
const {getallusers,singalUser,deactiveUser,activeUser,updateUser,deleteUser,getAllCategory,getAllSubCategory,activeDeactiveCategory} = require('../controllers/adminController')

// user routes
// router for get all user 
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management APIs
 */

/**
 * @swagger
 * /api/admin/allusers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all registered users from the database. Admin access may be required.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: All users fetched successfully
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
 *                   example: All users fetched successfully
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
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
_.get("/allusers", getallusers);
// _.get('/allusers',getallusers)
// _.get('/user/:id',singalUser)

/**
 * @swagger
 * /api/admin/user/{id}:
 *   get:
 *     summary: Get single user by ID
 *     description: Retrieve a specific user's details using their MongoDB ObjectId.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *         example: 671a2b3c4d5e6f7890123456
 *     responses:
 *       200:
 *         description: User fetched successfully
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
 *                   example: User fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671a2b3c4d5e6f7890123456
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@gmail.com
 *                     role:
 *                       type: string
 *                       example: user
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
_.get("/user/:id", singalUser);
// 

/**
 * @swagger
 * /api/admin/active/user:
 *   get:
 *     summary: Get all active users
 *     description: Retrieve all currently active users from the database.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Active users fetched successfully
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
 *                   example: Active users fetched successfully
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
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
_.get('/active/user',activeUser)
// ************

/**
 * @swagger
 * /api/admin/deactive/user:
 *   get:
 *     summary: Get all deactivated users
 *     description: Retrieve all users who are currently deactivated from the database.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Deactivated users fetched successfully
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
 *                   example: Deactivated users fetched successfully
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
 *                       isActive:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
_.get('/deactive/user',deactiveUser)
// **************

/**
 * @swagger
 * /api/admin/update/user/{id}:
 *   post:
 *     summary: Update user information
 *     description: Update an existing user's information using their MongoDB ObjectId.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *         example: 671a2b3c4d5e6f7890123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johnupdated@gmail.com
 *               role:
 *                 type: string
 *                 example: user
 *               isActive:
 *                 type: boolean
 *                 example: true
 *           example:
 *             name: John Updated
 *             email: johnupdated@gmail.com
 *             role: user
 *             isActive: true
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: User updated successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: 671a2b3c4d5e6f7890123456
 *                     name: John Updated
 *                     email: johnupdated@gmail.com
 *                     role: user
 *                     isActive: true
 *       400:
 *         description: Invalid user ID or request data
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
_.post('/update/user/:id',updateUser)
// *************

/**
 * @swagger
 * /api/admin/category/status/change/{id}:
 *   post:
 *     summary: Change category status
 *     description: Activate or deactivate a category using its MongoDB ObjectId.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the category
 *         schema:
 *           type: string
 *         example: 671a2b3c4d5e6f7890123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: Set true to activate or false to deactivate the category
 *                 example: false
 *     responses:
 *       200:
 *         description: Category status changed successfully
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
 *                   example: Category status changed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671a2b3c4d5e6f7890123456
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Invalid category ID or request data
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
_.post('/category/status/change/:id',activeDeactiveCategory)
// ****************************

/**
 * @swagger
 * /api/admin/delete/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user from the database using their MongoDB ObjectId.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user to delete
 *         schema:
 *           type: string
 *         example: 671a2b3c4d5e6f7890123456
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
_.delete('/delete/user/:id',deleteUser)


// category and sunCategory routes

/**
 * @swagger
 * /api/admin/all/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories from the database.
 *     tags:
 *       - Admin
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
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
_.get('/all/category',getAllCategory)
// *****************

/**
 * @swagger
 * /api/admin/all/subcategory:
 *   get:
 *     summary: Get all subcategories
 *     description: Retrieve all subcategories from the database.
 *     tags:
 *       - Admin
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
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
_.get('/all/subcategory',getAllSubCategory)



module.exports = _