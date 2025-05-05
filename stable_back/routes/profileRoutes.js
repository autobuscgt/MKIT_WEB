const Router = require('express')
const router = new Router()
const ProfileController = require('../controllers/profileController')
const authMiddleWare = require('../middlewares/authMiddleWare')
router.get('/:id',authMiddleWare,ProfileController.getProfile)
router.put('/',authMiddleWare,ProfileController.addImage)
router.post('/add',authMiddleWare,ProfileController.addGroup)
router.delete('/',authMiddleWare,ProfileController.removeGroup)

module.exports = router