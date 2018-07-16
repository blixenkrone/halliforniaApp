const express = require('express')
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname + '/dist/halliforniaApp')));

app.get('*', (req, res) => {
  const index = path.join(__dirname + '/dist/halliforniaApp/index.html');
  res.sendFile(index)
});

app.listen(process.env.PORT || 8080);
