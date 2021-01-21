const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8089",
    pathRewrite: {
      "^/api": "",
    },
    secure: false,
  })
);

app.listen(8088);
