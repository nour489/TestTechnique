const router = require("express").Router();
const upload = require("../config/multerConfig");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Item = require("../models/itemModel"); // Adjust to your model path

//Search
router.get("/courses", async (req, res) => {
  try {
    let items = await Models.Item.find({}).lean();
    items.forEach((item) => {
      item.price += " DT/Month";
    });
    // Add server base URL to the image paths
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const itemsWithImageUrl = items.map((item) => ({
      ...item,
      image: item.image ? `${baseUrl}${item.image}` : null, // Full URL for the image
    }));

    res.status(200).json(itemsWithImageUrl);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

router.get("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the item's ID from the URL

    // Find the item by its ID
    const item = await Models.Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Return the item in the response
    res.status(200).json({
      message: "Item retrieved successfully",
      item: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving item: " + err.message);
  }
});

//add
router.post("/courses", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newItem = await Models.Item.create({
      title: title,
      price: price,
      image: imagePath,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding item");
  }
});

//update
router.put("/courses/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params; // Get the item's ID from the URL
    const { title, price } = req.body; // Get the title and price from the body
    let imagePath = null; // Variable to hold the image path, in case it's updated

    // Check if the item exists by finding it by ID
    const item = await Models.Item.findById(id).lean();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // If an image is provided, handle the image upload
    console.log(req.file);
    if (req.file) {
      // If the item already has an image, you can delete the old image if you want to.
      // This would require a method to delete the file from the server,
      // but for now, we just overwrite the image path.
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      // If no new image is uploaded, retain the existing image path
      imagePath = item.image;
    }

    // Update the item fields with new data
    item.title = title || item.title; // Use the existing title if no new one is provided
    item.price = price || item.price; // Use the existing price if no new one is provided
    item.image = imagePath; // Update the image path

    // Save the updated item to the database
    await Models.Item.updateOne({ _id: id }, { $set: item });

    // Return the updated item
    res.status(200).json({
      message: "Item updated successfully",
      item: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item: " + err.message);
  }
});

//delete
router.delete("/courses/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the item's ID from the URL

    // Find the item by its ID
    const item = await Models.Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // If the item has an image, delete the image file from the server
    if (item.image) {
      const imagePath = path.join(__dirname, "..", item.image); // Get the full path of the image file
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });
    }

    // Delete the item from the database
    await Models.Item.deleteOne({ _id: id });

    // Respond with a success message
    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item: " + err.message);
  }
});

module.exports = router;
