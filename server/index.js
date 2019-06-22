const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const path = require('path');
const router = require('./router.js');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);


//serve the client
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`App listening on port ${port}!`));