import { Router } from 'express'
import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
const router = Router()


router.post('/users', UserController.store)
router.delete('/users/:id', UserController.delete)
router.get('/users', UserController.list)
router.get('/users/:username', UserController.listOne)
router.put('/users/:id', UserController.update)

router.post('/login', AuthController.login)


export default router;