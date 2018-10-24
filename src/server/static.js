const app = require('./app');
const express = require('express')
const path = require('path')
const port = 8080;

app.use(express.static('public/'))
app.listen(port, () => { console.log("Static server: start") })
app.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'))
})
