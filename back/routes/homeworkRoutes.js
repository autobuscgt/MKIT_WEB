const Router = require('express')
const router = new Router()
const HomeWorkController = require('../controllers/homeworkController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')
const authMiddleWare = require('../middlewares/authMiddleWare')
router.get('/',authMiddleWare,HomeWorkController.getAll)
router.get('/:id',authMiddleWare,HomeWorkController.getOne)
router.post('/',checkRoleMiddleware('Admin'),HomeWorkController.addHomeWork)
router.put('/:id',checkRoleMiddleware('Admin'), HomeWorkController.updateHomeWork)
router.delete('/:id',checkRoleMiddleware('Admin'),HomeWorkController.deleteHomeWork)

module.exports = router