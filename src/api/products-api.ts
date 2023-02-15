import axios from 'axios';

import { Product } from 'protocols/types';

const BASEURL = process.env.API_URL;
const productsURL = `${BASEURL}/products`;

async function getAll(): Promise<Product[]> {
  const response = await axios.get(productsURL);
  return response.data;
}

async function getById(productId: number): Promise<Product> {
  const response = await axios.get(`${productsURL}/${productId}`);
  return response.data;
}

const productsApi = {
  getAll,
  getById
}

export { productsApi };
