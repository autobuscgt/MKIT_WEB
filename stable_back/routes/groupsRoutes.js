const Router = require('express')
const router = new Router()
const GroupController = require('../controllers/groupsController')
const authMiddleWare = require('../middlewares/authMiddleWare')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.get('/',authMiddleWare,GroupController.getAll)
router.get('/:id',authMiddleWare,GroupController.getOne)
router.post('/',checkRoleMiddleware('Admin'),GroupController.addGroup)
router.put('/:id',checkRoleMiddleware('Admin'), GroupController.updateGroup)
router.delete('/:id',checkRoleMiddleware('Admin'),GroupController.deleteGroup)

module.exports = router