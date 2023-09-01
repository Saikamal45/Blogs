const express=require('express');
const cors = require('cors');
const path=require('path');
const app = express();
app.use(cors());

const routes = require('./routes');
app.use('/', routes);
app.use('/Files', express.static(path.join(__dirname,'Files')));
const port=process.env.PORT||3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

