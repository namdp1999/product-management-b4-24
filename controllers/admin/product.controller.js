const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");

const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /admin/products/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const filterStatus = [
    {
      label: "Tất cả",
      value: ""
    },
    {
      label: "Hoạt động",
      value: "active"
    },
    {
      label: "Dừng hoạt động",
      value: "inactive"
    },
  ];

  if(req.query.status) {
    find.status = req.query.status;
  }

  // Tìm kiếm
  let keyword = "";
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
    keyword = req.query.keyword;
  }
  // Hết Tìm kiếm

  // Phân trang
  const pagination = await paginationHelper(req, find);
  // Hết Phân trang

  const products = await Product
    .find(find)
    .limit(pagination.limitItems)
    .skip(pagination.skip)
    .sort({
      position: "desc"
    });

  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Quản lý sản phẩm",
    products: products,
    keyword: keyword,
    filterStatus: filterStatus,
    pagination: pagination
  });
}

// [PATCH] /admin/products/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
  const { id, statusChange } = req.params;

  await Product.updateOne({
    _id: id
  }, {
    status: statusChange
  });

  req.flash('success', 'Cập nhật trạng thái thành công!');

  res.json({
    code: 200
  });
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const { status, ids } = req.body;

  switch (status) {
    case "active":
    case "inactive":
      await Product.updateMany({
        _id: ids
      }, {
        status: status
      });
      break;
    case "delete":
      await Product.updateMany({
        _id: ids
      }, {
        deleted: true
      });
      break;
    default:
      break;
  }

  res.json({
    code: 200
  });
}

// [PATCH] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({
    _id: id
  }, {
    deleted: true
  });

  req.flash('success', 'Xóa sản phẩm thành công!');

  res.json({
    code: 200
  });
}

// [PATCH] /admin/products/change-position/:id
module.exports.changePosition = async (req, res) => {
  const id = req.params.id;
  const position = req.body.position;

  await Product.updateOne({
    _id: id
  }, {
    position: position
  });

  res.json({
    code: 200
  });
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm"
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  if(req.file && req.file.filename) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProducts = await Product.countDocuments({});
    req.body.position = countProducts + 1;
  }
  
  const newProduct = new Product(req.body);
  await newProduct.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

    if(product) {
      res.render("admin/pages/products/edit", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product
      });
    } else {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    if(req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const countProducts = await Product.countDocuments({});
      req.body.position = countProducts + 1;
    }

    await Product.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    req.flash("success", "Cập nhật sản phẩm thành công!");
  } catch (error) {
    req.flash("error", "Id sản phẩm không hợp lệ!");
  }

  res.redirect("back");
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

    if(product) {
      res.render("admin/pages/products/detail", {
        pageTitle: "Chi tiết sản phẩm",
        product: product
      });
    } else {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}