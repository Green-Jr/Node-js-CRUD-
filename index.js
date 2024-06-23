const express = require('express');
const sequelize = require('./config/database'); // Importa la instancia de Sequelize
const Item = require('./models/item'); // Importa el modelo Item

const app = express();
const port = process.env.PORT || 3000;

// Sincroniza los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Middleware para procesar JSON
app.use(express.json());

// Ruta para obtener todos los items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Ruta para crear un nuevo item
app.post('/items', async (req, res) => {
  try {
    const { name } = req.body;
    const item = await Item.create({ name });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
