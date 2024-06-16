import express from 'express';
const adminRouter =express.Router();
adminRouter.get('/users/count',getUserCount);
adminRouter.delete('/users/:id',deleteUser);




adminRouter.post('/categories',addCategory);
adminRouter.post('/categories/:id',editCategory);
adminRouter.delete('/categories/:id',deleteCategory);


adminRouter.get('/products/count',getProductsCount);
adminRouter.post('/products/',addProduct);
adminRouter.put('/products/:id',editProduct);
adminRouter.delete('/products/:id/images',deleteProductImages);
adminRouter.delete('/products/:id/',deleteProduct);



adminRouter.get('/orders',getOrders);
adminRouter.delete('/orders/count',getOrdersCount)
adminRouter.delete('/orders/:id',changeOrderStatus);


export default adminRouter
