const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./router.js');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

app.listen(port, () => console.log(`App listening on port ${port}!`));