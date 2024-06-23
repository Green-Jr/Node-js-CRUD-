const express = require('express');
const sequelize = require('./config/database');
const Item = require('./models/item');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sincronizar con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Rutas CRUD
app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/items', async (req, res) => {
  try {
    const { name } = req.body;
    const item = await Item.create({ name });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const item = await Item.findByPk(id);
    if (item) {
      item.name = name;
      await item.save();
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (item) {
      await item.destroy();
      res.send('Item deleted');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
