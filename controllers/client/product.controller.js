const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

// [GET] /products/
module.exports.index = async (req, res) => {
  const products = await Product
    .find({
      status: "active",
      deleted: false
    })
    .sort({
      position: "desc"
    });

  for (const item of products) {
    item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
  }

  // console.log(products);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products
  });
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;

  const category = await ProductCategory.findOne({
    slug: slugCategory,
    status: "active",
    deleted: false
  });

  const allSubCategory = [];

  const getSubCategory = async (currentId) => {
    const subCategory = await ProductCategory.find({
      parent_id: currentId,
      status: "active",
      deleted: false
    });

    for (const sub of subCategory) {
      allSubCategory.push(sub.id);
      await getSubCategory(sub.id);
    }
  }

  await getSubCategory(category.id);

  const products = await Product
    .find({
      product_category_id: {
        $in: [
          category.id,
          ...allSubCategory
        ]
      },
      status: "active",
      deleted: false
    })
    .sort({
      position: "desc"
    });

  for (const item of products) {
    item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
  }

  // console.log(products);

  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: products
  });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  const product = await Product.findOne({
    slug: slug,
    deleted: false,
    status: "active"
  });

  product.priceNew = ((1 - product.discountPercentage/100) * product.price).toFixed(0);

  // console.log(product);

  if(product) {
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } else {
    res.redirect("/");
  }
}