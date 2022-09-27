const express = require("express");

const ApiResponse = (res, statusCode, status, message, data) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = ApiResponse;
