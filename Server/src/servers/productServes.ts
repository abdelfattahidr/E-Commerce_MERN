import { productModel } from "../models/product.model";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedinitialProducts = async () => {
  const products = [
    {
      title: "Dell Laptop",
      image:
        "https://www.freepik.com/premium-photo/electronic-device-balancing-concept_43218416.htm#fromView=keyword&page=1&position=10&uuid=b3329e8d-64b7-46ff-b9fe-f46acb76f97c&query=Dell+Laptop",
      price: 15000,
      stock: 10,
    },
    {
      title: "lenovo Laptop",
      image:
        "https://www.freepik.com/premium-photo/electronic-device-balancing-concept_43218416.htm#fromView=keyword&page=1&position=10&uuid=b3329e8d-64b7-46ff-b9fe-f46acb76f97c&query=lenovo+Laptop",
      price: 20000,
      stock: 20,
    },
    {
      title: "HP Laptop",
      image:
        "https://www.freepik.com/free-photo/laptop-with-sun-background_977675.htm#fromView=search&page=1&position=28&uuid=e2025bb2-731a-45c7-83a1-a917151e9f0a&query=hp+laptop",
      price: 300,
      stock: 30,
    },
  ];

  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    return await productModel.insertMany(products);
  }
};
