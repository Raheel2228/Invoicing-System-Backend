const express = require('express');
const router = express.Router();
const InvoiceController = require('../app/controllers/invoiceController');

router.get('/invoices', InvoiceController.getAllInvoices);
router.post('/invoices', InvoiceController.createInvoice);
module.exports = router;