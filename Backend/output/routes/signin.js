"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const route = express_1.default.Router();
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(404).send("Send Full credentials");
    try {
        const users = yield prisma.user.findUnique({
            where: {
                username: username
            },
        });
        if (!users) {
            return res.status(404).send("User not found");
        }
        if (users.password != password)
            return res.status(404).send("Invalid Password");
        res.status(200).json({ message: users.id });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}));
exports.default = route;
