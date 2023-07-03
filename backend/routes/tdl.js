const express = require('express');
const router = express.Router();

const Tdl = require('../model/models');

router.get('/test', (req, res) => res.send('tdl route testing!'));

router.get('/', (req, res) => {
  Tdl.find()
    .then(tdls => res.json(tdls))
    .catch(err => res.status(404).json({ noitemfound: 'No items found' }));
});

router.get('/:id', (req, res) => {
  Tdl.findById(req.params.id)
    .then(tdl => res.json(tdl))
    .catch(err => res.status(404).json({ noitemfound: 'No Item found' }));
});

 router.post('/', (req, res) => {
   Tdl.create(req.body)
     .then(tdl => res.json({ msg: 'Item added successfully' }))
     .catch(err => res.status(400).json({ error: 'Unable to add this item' }));
 });

router.put('/:id', (req, res) => {
  Tdl.findByIdAndUpdate(req.params.id, req.body)
    .then(tdl => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:id', (req, res) => {
  Tdl.findByIdAndRemove(req.params.id, req.body)
    .then(tdl => res.json({ mgs: 'Item deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a item' }));
});

module.exports = router;