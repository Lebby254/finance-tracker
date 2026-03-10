"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.aiApi = exports.generalApi = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Base API URL
var API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Create a reusable axios instance

var api = _axios["default"].create({
  baseURL: "".concat(API_URL, "/api")
}); // Attach auth token automatically


api.interceptors.request.use(function (config) {
  var token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = "Bearer ".concat(token);
  }

  return config;
}); // General endpoints (auth, budget, transaction)

var generalApi = api; // AI endpoints

exports.generalApi = generalApi;
var aiApi = {
  getOverview: function getOverview(token) {
    return _axios["default"].get("".concat(API_URL, "/api/ai/overview"), {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    });
  },
  getForecast: function getForecast(data, token) {
    return _axios["default"].post("".concat(API_URL, "/api/ai/forecast"), data, {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    });
  },
  getAdvice: function getAdvice(data, token) {
    return _axios["default"].post("".concat(API_URL, "/api/ai/advice"), data, {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    });
  }
};
exports.aiApi = aiApi;
var _default = api;
exports["default"] = _default;