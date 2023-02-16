import { checkProductData } from './products-services';
import { checkUserData } from './users-services';

export async function estimatePurchase({ userId, products }: { userId: number, products: number[] }) {
  const user = await checkUserData(userId);

  let totalPrice = 0;
    
  const estimatedList = await Promise.all(products.map(async (productId) => {
    const product = await checkProductData(productId);

    const estimatedPrice = (product.price * (user.tax/100));
    totalPrice += estimatedPrice;
    
    return {
      ...product,
      price: estimatedPrice
    };
  }));

  return {
    userId: user.id,
    userName: user.name,
    purchasePrice: totalPrice,
    purchaseProducts: [ ...estimatedList ]
  };
}
