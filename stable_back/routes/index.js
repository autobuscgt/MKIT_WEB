const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const scheduleRoutes = require('./scheduleRoutes')
const profileRoutes = require('./profileRoutes')
const homeworkRoutes = require('./homeworkRoutes')
const groupRoutes = require('./groupsRoutes')
const eventsRoutes = require('./eventsRoutes')

router.use('/auth',userRoutes)
router.use('/schedule',scheduleRoutes)
router.use('/profile',profileRoutes)
router.use('/homework',homeworkRoutes)
router.use('/groups',groupRoutes)
router.use('/events',eventsRoutes)

module.exports = router