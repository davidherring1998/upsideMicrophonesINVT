const router = require("express").Router();
const {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");
// const { protect } = require("../middleware/auth");
router.get("/", getProduct);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
