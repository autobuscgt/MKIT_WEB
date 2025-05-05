const Router = require('express')
const router = new Router()
const EventsController = require('../controllers/eventsController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.get('/',EventsController.getAll)
router.get('/:id',EventsController.getOne)
router.post('/',checkRoleMiddleware('Admin'),EventsController.addEvent)
router.put('/:id', checkRoleMiddleware('Admin'),EventsController.updateEvent)
router.delete('/:id',checkRoleMiddleware('Admin'),EventsController.deleteEvent)

module.exports = router