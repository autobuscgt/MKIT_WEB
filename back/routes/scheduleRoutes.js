const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')
const authMiddleWare = require('../middlewares/authMiddleWare')
router.post('/add',checkRoleMiddleware('Admin'),scheduleController.addSchedule)
router.get('/',authMiddleWare,scheduleController.getAll)
router.get('/:id',authMiddleWare,scheduleController.getOne)
router.delete('/:id' ,checkRoleMiddleware('Admin'),scheduleController.deleteSchedule)
router.put('/:id' ,checkRoleMiddleware('Admin'),scheduleController.updateSchedule)

module.exports = router