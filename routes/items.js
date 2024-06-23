const express = require('express');
const router = express.Router();
const db = require('../models');
const Item = db.Item;

// @route GET /api/items
// @desc Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route POST /api/items
// @desc Create a new item
router.post('/', async (req, res) => {
    try {
        const newItem = await Item.create({
            name: req.body.name
        });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route GET /api/items/:id
// @desc Get a single item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route PUT /api/items/:id
// @desc Update an item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = req.body.name || item.name;
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route DELETE /api/items/:id
// @desc Delete an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
