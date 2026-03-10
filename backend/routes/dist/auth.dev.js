"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // REGISTER


router.post('/register', function _callee(req, res) {
  var _req$body, email, password, user, salt, hashed, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'User already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt(10));

        case 9:
          salt = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, salt));

        case 12:
          hashed = _context.sent;
          user = new _User["default"]({
            email: email,
            password: hashed
          });
          _context.next = 16;
          return regeneratorRuntime.awrap(user.save());

        case 16:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          }); // ✅ Include user info

          res.json({
            token: token,
            user: {
              _id: user._id,
              email: user.email
            }
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0.message);
          res.status(500).json({
            msg: 'Server error'
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
}); // LOGIN

router.post('/login', function _callee2(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid credentials'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid credentials'
          }));

        case 12:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          }); // ✅ Include user info here too

          res.json({
            token: token,
            user: {
              _id: user._id,
              email: user.email
            }
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0.message);
          res.status(500).json({
            msg: 'Server error'
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
var _default = router;
exports["default"] = _default;