const Invoice = require("../models/Invoices");
const InvoiceItems = require("../models/InvoiceItems");
const Products = require("../models/Products");

exports.getAllInvoices = async (req, res) => {
  let invoices = await Invoice.findAll();
  console.log("Incvoice: ", invoices);
  for (const i in invoices) {
    let prods = [];
    let invItm = await InvoiceItems.findAll({
      where: { invoiceId: invoices[i].id },
    });
    for (const j in invItm) {
      let itm = invItm[j];
      let Obj = { name: "", price: 0, quantity: itm.quantity };
      let prod = await Products.findOne({ where: { id: itm.productId } });
      Obj.name = prod.name;
      Obj.price = prod.price;
      prods.push(Obj);
    }
    console.log("prods: ", prods);
    invoices[i].dataValues.products = prods;
    console.log("inv: ", invoices[i]);
  }

  return res.status(200).json(invoices);
};

exports.createInvoice = async (req, res) => {
  var { body } = req;
  let newInv = await Invoice.create({
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    customer_address: body.customer_address,
    customer_email: body.customer_email,
    pin: body.pin,
    tax: body.tax,
    discount: body.discount,
    total_amount: body.total_amount,
  });
  console.log("Inv: ", newInv.dataValues);
  //create invoice items
  for (const i in body.products) {
    let product = await Products.findOrCreate({
      where: {
        name: body.products[i].name,
      },
      defaults: {
        name: body.products[i].name,
        price: body.products[i].price,
        //properties you want on create
      },
    }).then(async function (prod) {
      let prods = prod[0]; //new or found

      await InvoiceItems.create({
        invoiceId: newInv.dataValues.id,
        productId: prods.id,
        quantity: body.products[i].quantity,
      });
    });
  }
  let invoices = await Invoice.findAll();
  console.log("Incvoice: ", invoices);
  for (const i in invoices) {
    let prods = [];
    let invItm = await InvoiceItems.findAll({
      where: { invoiceId: invoices[i].id },
    });
    for (const j in invItm) {
      let itm = invItm[j];
      let Obj = { name: "", price: 0, quantity: itm.quantity };
      let prod = await Products.findOne({ where: { id: itm.productId } });
      Obj.name = prod.name;
      Obj.price = prod.price;
      prods.push(Obj);
    }
    console.log("prods: ", prods);
    invoices[i].dataValues.products = prods;
    console.log("inv: ", invoices[i]);
  }

  return res.status(200).json(invoices);
};
