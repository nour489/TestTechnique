
let countryController={};
countryController.addCountry=async function(req,res)
{

    const newCountry = new Models.Country(req.body)
    const savedCountry = await newCountry.save()
    res.json(savedCountry)

}
module.exports = countryController;
