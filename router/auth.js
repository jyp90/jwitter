import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import validate from ''
import authController from '../api/controller/auth'


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
    validate
];


const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url').isURL().withMessage('invalid URL').optional({ 
        nullable: true,
        checkFalsy: true
    }),
    validate
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);

export default router;