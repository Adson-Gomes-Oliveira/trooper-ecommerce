const { request } = require('express');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const AccountsServices = require('../services/accounts.service');
const { verifyToken } = require('../helpers/token.jwt');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/login.validation');
// const blocklist = require('../redis/blocklist.service');
