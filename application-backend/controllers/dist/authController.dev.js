"use strict";

var asyncHandler = require("express-async-handler");

var bcrypt = require("bcryptjs");

var _require = require("../models/User"),
    User = _require.User,
    validateRegisterUser = _require.validateRegisterUser,
    validateLoginUser = _require.validateLoginUser;

var VerificationToken = require("../models/VerificationToken");

var crypto = require("crypto");

var sendEmail = require("../utils/sendEmail");
/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/


module.exports.registerUserCtrl = asyncHandler(function _callee(req, res) {
  var _validateRegisterUser, error, user, salt, hashedPassword, verifictionToken, link, htmlTemplate;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validateRegisterUser = validateRegisterUser(req.body), error = _validateRegisterUser.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "user already exist"
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 13:
          hashedPassword = _context.sent;
          user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          });
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          verifictionToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
          });
          _context.next = 20;
          return regeneratorRuntime.awrap(verifictionToken.save());

        case 20:
          link = "".concat(process.env.CLIENT_DOMAIN, "/users/").concat(user._id, "/verify/").concat(verifictionToken.token);
          htmlTemplate = "\n    <div>\n      <p>Click on the link below to verify your email</p>\n      <a href=\"".concat(link, "\">Verify</a>\n    </div>");
          _context.next = 24;
          return regeneratorRuntime.awrap(sendEmail(user.email, "Verify Your Email", htmlTemplate));

        case 24:
          res.status(201).json({
            message: "We sent to you an email, please verify your email address"
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(function _callee2(req, res) {
  var _validateLoginUser, error, user, isPasswordMatch, verificationToken, link, htmlTemplate, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _validateLoginUser = validateLoginUser(req.body), error = _validateLoginUser.error;

          if (!error) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "invalid email or password"
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 10:
          isPasswordMatch = _context2.sent;

          if (isPasswordMatch) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "invalid email or password"
          }));

        case 13:
          if (user.isAccountVerified) {
            _context2.next = 26;
            break;
          }

          _context2.next = 16;
          return regeneratorRuntime.awrap(VerificationToken.findOne({
            userId: user._id
          }));

        case 16:
          verificationToken = _context2.sent;

          if (verificationToken) {
            _context2.next = 21;
            break;
          }

          verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
          });
          _context2.next = 21;
          return regeneratorRuntime.awrap(verificationToken.save());

        case 21:
          link = "".concat(process.env.CLIENT_DOMAIN, "/users/").concat(user._id, "/verify/").concat(verificationToken.token);
          htmlTemplate = "\n    <div>\n      <p>Click on the link below to verify your email</p>\n      <a href=\"".concat(link, "\">Verify</a>\n    </div>");
          _context2.next = 25;
          return regeneratorRuntime.awrap(sendEmail(user.email, "Verify Your Email", htmlTemplate));

        case 25:
          return _context2.abrupt("return", res.status(400).json({
            message: "We sent to you an email, please verify your email address"
          }));

        case 26:
          token = user.generateAuthToken();
          res.status(200).json({
            _id: user._id,
            isAdmin: user.isAdmin,
            darkMode: user.darkMode,
            profilePhoto: user.profilePhoto,
            token: token,
            username: user.username
          });

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.verifyUserAccountCtrl = asyncHandler(function _callee3(req, res) {
  var user, verificationToken;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.userId));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "invalid link"
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(VerificationToken.findOne({
            userId: user._id,
            token: req.params.token
          }));

        case 7:
          verificationToken = _context3.sent;

          if (verificationToken) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "invalid link"
          }));

        case 10:
          user.isAccountVerified = true;
          _context3.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(verificationToken.remove());

        case 15:
          res.status(200).json({
            message: "Your account verified"
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  });
});