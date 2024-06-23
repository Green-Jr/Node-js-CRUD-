const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const items = require('./routes/items');
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/items', items);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => console.log(err));
