var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.get('/server', function (req, res) {
  console.log(req.headers);

  const auth = req.headers['auth'];
  if (auth) {
    res.send({
      ...req.headers,
      msg: 'user autenticated',
    });
  } else {
    res.send({
      ...req.headers,
      msg: 'cannot find email',
    });
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});