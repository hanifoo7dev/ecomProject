const express = require('express')
const _ = express.Router()
const {getAllUser} = require('../controllers/userController')

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




module.exports = _