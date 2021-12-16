const router = require('express').Router()
const authMiddleware=require('../middleware/auth')
const countryController=require('../controllers/countryController')


router.post('/',authMiddleware, async (req, res) => {
  try {
countryController.addCountry(req,res,next)
} catch (err) {
  res.status(500).send()

}
})




module.exports = router
