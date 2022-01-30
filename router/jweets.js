import express from 'express';
import 'express-async-errors'
import { body } from 'express-validator'
import { isAuth } from '../api/middleware/auth'
import * as msgController from '../api/controller/msg'
import { validate } from '../api/middleware/validator'

const router = express.Router();

const validateJwitter = [
    body('message').trim().isLength( {
        min: 10
    }).withMessage('문자는 최소한 10자 이상 등록해주세요'),
    validate
]

router.get('/', msgController.getJwitters)

router.get('/:id', msgController.getJwitter)

router.post('/', isAuth, msgController.postJwitter)

router.put('/:id', isAuth, msgController.putJwitter)

router.delete('/:id', isAuth, msgController.deleteJwitter)

export default router;