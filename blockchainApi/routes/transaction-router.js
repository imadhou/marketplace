const express = require('express');
const controller = require('../controllers/transaction-controller');

const router = express.Router();

router.post("/search", controller.searchTransactions);
router.get("/initialize", controller.initTransactions);
router.post('/', controller.addTransaction);
router.get('/', controller.getAllTransactions);
router.get('/Last', controller.getLastTransactions);
router.get('/:id', controller.getTransactionById);
router.post('/query', controller.getTransactionsByquery);

module.exports = router;