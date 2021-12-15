const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const collection = {
  collectionName: "Country"
};
var mongoosePaginate = require('mongoose-paginate-v2');


const countrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  alpha2: {
    type: String,
    required: false,
    index: true
  },
  alpha3: {
    type: String,
    required: false,
  },
  cc: {
    type: String,
    //  required: true,
  },

}, {
  timestamps: true
})
countrySchema.plugin(mongoosePaginate);

const Country = mongoose.model('Country', countrySchema)
module.exports = {
  Country,
  countrySchema,
  collection
}
