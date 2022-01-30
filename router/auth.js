import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../api/middleware/validator'
import * as authController from '../api/controller/auth'
import { isAuth } from '../api/middleware/auth'


const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min : 5 })
        .withMessage('password shout be at least 5 characters'),
    validate,
];


const validateRegister = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url').isURL().withMessage('invalid URL').optional({ 
        nullable: true,
        checkFalsy: true
    }),
    validate
];

router.post('/register', validateRegister, authController.register);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);

export default router;