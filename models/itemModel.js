const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collection = {
  collectionName: "Item",
};
var mongoosePaginate = require("mongoose-paginate-v2");

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
itemSchema.plugin(mongoosePaginate);

const Item = mongoose.model("Item", itemSchema);
module.exports = {
  Item,
  itemSchema,
  collection,
};
