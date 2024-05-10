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
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, id } = req.body;
    if (!userid || !id)
        return res.status(404).send("Please send Valid data");
    try {
        const postinfo = yield prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!postinfo)
            return res.status(404);
        const user = yield prisma.liked.create({
            data: {
                userId: parseInt(userid),
                postId: parseInt(id),
                action: "saved",
                username: postinfo.username,
                userimage: postinfo.userimage,
                imageUrl: postinfo.imageUrl,
                useremail: postinfo.useremail,
                tags: postinfo.tags,
                location: postinfo.location,
                caption: postinfo.caption
            }
        });
        if (!user)
            return res.status(404).send("Please send a valid User");
        return res.status(200).send("liked ");
    }
    catch (error) {
        console.log(error);
    }
}));
/*=====================================================================Delete Request ============================================*/
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, id } = req.body;
    if (!userid || !id)
        res.status(404).send("Please send complete Credentials");
    try {
        const user = yield prisma.liked.findMany({
            where: {
                userId: parseInt(userid),
                postId: parseInt(id),
                action: "saved"
            }
        });
        if (user.length === 0)
            return res.status(404).send("Like not found");
        for (const like of user) {
            yield prisma.liked.delete({
                where: {
                    id: like.id
                }
            });
        }
        return res.status(200).send("unliked");
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const val = req.query.id;
    if (!val) {
        return res.status(400).send("ID parameter is missing");
    }
    const id = parseInt(val.toString());
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: id,
            },
            include: { liked: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newar = user.liked.filter((item) => (item.action === "saved"));
        return res.status(200).send(newar);
    }
    catch (error) {
        console.log(error);
        return res.status(404);
    }
}));
exports.default = router;
