import joi, { number, Schema } from 'joi';

const idParam = (idName: string) => {
  return joi.object({
    [idName]: joi.number().integer().min(1).required()
  });
};

const purchaseBody = joi.object({
  products: joi.array().items(joi.number().integer().min(1))
});

const schemas = {
  idParam,
  purchaseBody
};

export { schemas };
