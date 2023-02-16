import { productsApi } from 'api/products-api';
import { errors } from 'errors/errors';

export async function listAllProducts() {
  try {
    const products = await productsApi.getAll();
    return products;    
  } catch (error) {
    throw errors.fetchDataError();
  }
}

export async function checkProductData(productId: number) {
  try {
    const product = await productsApi.getById(productId);
    return product;    
  } catch (error) {
    throw errors.notFoundError('product');
  }
}
