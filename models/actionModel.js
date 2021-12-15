const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const collection = {
  collectionName: "Action"
};
const actionSchema = new Schema({
  email: {
    type: String,
  },
  customer: {
    type: String,
  },
  hostname: {
    type: String,
  },
  ip: {
    type: String,
  },
  originalUrl: {
    type: String,
  },
  params: {
    type: Schema.Types.Mixed,
  },
  path: {
    type: String,
  },
  protocol: {
    type: String,
  },
  query: {
    type: Schema.Types.Mixed,
  },
  method: {
    type: String,
  },
  secure: {
    type: Boolean,
  },
  xhr: {
    type: Boolean,
  },
  body: {
    type: Schema.Types.Mixed,
  }


}, {
  timestamps: true
})
actionSchema.plugin(mongoosePaginate);
const Action = mongoose.model('Action', actionSchema)
module.exports = {
  Action,
  actionSchema,
  collection
}
