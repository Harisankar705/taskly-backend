"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const statusCodes_1 = require("../utils/statusCodes");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Something went wrong"
    });
};
exports.errorHandler = errorHandler;
