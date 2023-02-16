import { productsApi } from 'api/products-api';
import { errors } from 'errors/errors';

export async function listAllProducts() {
  const products = await productsApi.getAll();
  if(!products) throw errors.fetchDataError();
  return products;
}

export async function checkProductData(productId: number) {
  const product = await productsApi.getById(productId);
  if(!product) throw errors.notFoundError('product');
  return product;
}
