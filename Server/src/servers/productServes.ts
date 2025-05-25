import { productModel } from "../models/product.model";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedinitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        image: "/public/Dell.jpg",
        price: 15000,
        stock: 10,
      },
      {
        title: "lenovo Laptop",
        image: "/public/lenovo.jpg",
        price: 20000,
        stock: 20,
      },
      {
        title: "HP Laptop",
        image: "/public/HP.jpg",
        price: 300,
        stock: 30,
      },
    ];

    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      return await productModel.insertMany(products);
    }
  } catch (err) {
    console.log("cannot see database", err);
  }
};
