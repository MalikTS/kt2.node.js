const Router = require('express');
const productController = require('../controllers/productController.js');
const uploadImg = require('../middleware/uploadMiddleware.js');

const router = new Router();


router.post('/products',  uploadImg.array("imageUrl"), productController.addProduct);
router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.put("/product/update", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct); 


module.exports = router
