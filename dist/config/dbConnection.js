"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URL, string;
 | undefined;
process.env.DB_URL;
const dbConnect = () => {
    try {
        const connect = mongoose_1.default.connect(DB_URL);
        console.log("Database Connected Successfully");
    }
    catch (error) {
        console.log(`Database error ${error}`);
    }
};
module.exports = dbConnect;
