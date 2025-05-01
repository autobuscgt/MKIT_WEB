const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleWare = require('../middlewares/authMiddleWare')
const checkRoleMiddleWare = require('../middlewares/checkRoleMiddleware')

router.post('/login',UserController.login)
router.post('/registration',UserController.registration)
router.get('/',checkRoleMiddleWare('Admin'),UserController.getAll)
router.get('/check',authMiddleWare,UserController.check)
router.get('/profile',authMiddleWare,UserController.getProfile)
router.patch('/:id/group',UserController.doGroup)
router.get('/:id/group',UserController.getGroup)
module.exports = router