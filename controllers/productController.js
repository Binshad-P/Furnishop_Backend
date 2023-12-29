import { log } from "console";
import product from "../models/productModel.js";
import fs from "fs";
export const addstock = async (req, res) => {
  const {
    productname,
    actualprice,
    discountprice,
    category,
    description,
    color,
    brand,
    material,
    furnishfinish,
    model,
    about,
  } = req.body;
  const image1 = req.files["image1"][0].path;
  const image2 = req.files["image2"][0].path;
  const image3 = req.files["image3"][0].path;
  const image4 = req.files["image4"][0].path;

  if (
    !productname ||
    !actualprice ||
    !discountprice ||
    !category ||
    !description ||
    !color ||
    !brand ||
    !material ||
    !furnishfinish ||
    !model ||
    !about ||
    !image1 ||
    !image2 ||
    !image3 ||
    !image4
  ) {
    res.status(400).json({ message: "All fields are mandatory" });
    return;
  }
  try {
    const newProduct = new product({
      productname,
      actualprice,
      discountprice,
      category,
      description,
      color,
      brand,
      material,
      furnishfinish,
      model,
      about,
      images: [image1, image2, image3, image4],
    });
    await newProduct.save();
    res.status(201).json({ message: "Product saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const stockdetails = async (req, res) => {
  const products = await product.find();
  res.json(products);
};

export const singleproduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const produc = await product.findById(productId);
    res.json(produc);
    console.log(produc);
  } catch (error) {
    console.log(error, "err");
  }
};
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  console.log(productId,"000000000");
  // const {
  //   productname,
  //   actualprice,
  //   discountprice,
  //   category,
  //   description,
  //   color,
  //   brand,
  //   material,
  //   furnishfinish,
  //   model,
  //   about,
    // imagepath1,
    // imagepath2,
    // imagepath3,
    // imagepath4,
  // } = req.body
  // const image1 = req.files["image1"][0].path;
  // const image2 = req.files["image2"][0].path;
  // const image3 = req.files["image3"][0].path;
  // const image4 = req.files["image4"][0].path;
  // if (
  //   !productname ||
  //   !actualprice ||
  //   !discountprice ||
  //   !category ||
  //   !description ||
  //   !color ||
  //   !brand ||
  //   !material ||
  //   !furnishfinish ||
  //   !model ||
  //   !about
  //   // ||
  //   // !image1 ||
  //   // !image2 ||
  //   // !image3 ||
  //   // !image4
  // ) {
  //   res.status(400).json({ message: "All fields are mandatory" });
  //   return;
  // }

  const products = await product.findById(productId);
  console.log(req.body.imagepath1,87);
  console.log(req.files["image1"]);

  if (req.files) {
    if(req.files["image1"]){
      if (fs.existsSync(req.body.imagepath1)) {
        fs.unlinkSync(req.body.imagepath1);
      } else {
        console.log("not found 1");
      }

      products.images[0] = req.files["image1"][0].path

    }
    if(req.files["image2"]){
      if (fs.existsSync(req.body.imagepath2.split('\\')[1])) {
        fs.unlinkSync(req.body.imagepath2.split('\\')[1]);
      } else {
        console.log("not found 2");
      }

      products.images[1] = req.files["image2"][0].path

    }
    if(req.files["image3"]){
      if (fs.existsSync(req.body.imagepath3.split('\\')[1])) {
        fs.unlinkSync(req.body.imagepath3.split('\\')[1]);
      } else {
        console.log("not found 3");
      }

      products.images[2] = req.files["image3"][0].path

    }
    if(req.files["image4"]){
      if (fs.existsSync(req.body.imagepath4.split('\\')[1])) {
        fs.unlinkSync(req.body.imagepath4.split('\\')[1]);
      } else {
        console.log("not found 4");
      }

      products.images[3] = req.files["image4"][0].path

    }

      Object.assign(products, req.body);

      try {
        await products.save()
        // await product.findByIdAndUpdate(productId, products);
        res.status(201).json({ message: "Stock update successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
};

export const removeproduct = async (req, res) => {
  const { id } = req.params;

  const remove = await product.findByIdAndDelete(id);

  // console.log(result.images,555444);

  const allimages = remove.images;
  allimages?.map((item) => {
    if (fs.existsSync(item)) {
      fs.unlinkSync(item);
    }
  });
  // res.status(201).json({ message: "Stock remove successfully" });
  console.log("removed ");
  res.json(remove);
};
