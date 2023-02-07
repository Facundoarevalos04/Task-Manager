const express = require('express');
const router = express.Router();

const { list, store, detail, update, remove,changeState  } = require('../controllers/tasksController')

/* /api/tasks */

router
    .route('/')
         .get(list)
         .post(store)
router
    .route('/:id')
         .get(detail)
         .post(update)
         .delete(remove)
router
         .post('/change-tate/id', changeState)
         

module.exports = router;
