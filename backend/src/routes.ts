import { Router } from 'express'
import UserController from './app/controllers/UserController'
const router = Router()


router.post('/users', UserController.store)
router.delete('/users/:', UserController.delete)
router.get('/users', UserController.list)
router.get('/users/:username', UserController.listOne)
router.put('/users/:username', UserController.update)


export default router;