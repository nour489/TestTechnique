const router = require('express').Router()




router.post('/', async (req, res) => {
  try {
    const newCountry = new Models.Country(req.body)
    const savedCountry = await newCountry.save()
    res.json(savedCountry)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})




module.exports = router
