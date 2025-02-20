import { UserController } from '@core/controllers/user.controller';
import UserRole from '@core/enums/user-role.enum';
import authenticateToken from '@core/middlewares/auth.middleware';
import roleBasedAccess from '@core/middlewares/roleBasedAccess';
import validation from '@core/middlewares/validate.middleware';
import userValidation from '@core/validators/user.validation';
import { Router } from 'express';

const router: Router = Router();
const userController = new UserController();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the system.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - profilePic
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Doe
 *               profilePic:
 *                 type: string
 *                 description: URL to the user's profile picture.
 *                 example: http://example.com/profile.jpg
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user.
 *                   example: 123e4567-e89b-12d3-a456-4266-9c88-29676616ae26e
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/users/', [validation(userValidation)], userController.createUser);

/**
 * @openapi
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     description: Creates a new admin in the system.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - profilePic
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Doe
 *               profilePic:
 *                 type: string
 *                 description: URL to the user's profile picture.
 *                 example: http://example.com/profile.jpg
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user.
 *                   example: 123e4567-e89b-12d3-a456-4266-9c88-29676616ae26e
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.post(
  '/admins',
  [
    authenticateToken,
    roleBasedAccess(UserRole.SuperAdmin),
    validation(userValidation),
  ],
  userController.createAdmin,
);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Find a user by ID
 *     description: Returns a single user by ID.
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the user.
 *                   example: 123e4567-e89b-12d3-a456-4266-9c88-29676616ae26e
 *                 firstName:
 *                   type: string
 *                   description: The user's first name.
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   description: The user's last name.
 *                   example: Doe
 *                 profilePic:
 *                   type: string
 *                   description: URL to the user's profile picture.
 *                   example: http://example.com/profile.jpg
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   description: The user's password.
 *                   example: password123
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.get('/users/:id', [authenticateToken], userController.findUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of users.
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: A list of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the user.
 *                     example: 123e4567-e89b-12d3-a456-4266-9c88-29676616ae26e
 *                   firstName:
 *                     type: string
 *                     description: The user's first name.
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     description: The user's last name.
 *                     example: Doe
 *                   profilePic:
 *                     type: string
 *                     description: URL to the user's profile picture.
 *                     example: http://example.com/profile.jpg
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: user@example.com
 *                   password:
 *                     type: string
 *                     description: The user's password.
 *                     example: password123
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.get('/users/', [authenticateToken], userController.findUsers);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user in the system.
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - profilePic
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Doe
 *               profilePic:
 *                 type: string
 *                 description: URL to the user's profile picture.
 *                 example: http://example.com/profile.jpg
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.put(
  '/users/:id',
  [authenticateToken, validation(userValidation)],
  userController.updateUser,
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a single user by ID.
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.delete('/users/:id', [authenticateToken], userController.deleteUser);

export default router;
