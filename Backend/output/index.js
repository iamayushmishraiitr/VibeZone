"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const post_1 = __importDefault(require("./routes/post"));
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const profile_1 = __importDefault(require("./routes/profile"));
const like_1 = __importDefault(require("./routes/like"));
const likedPost_1 = __importDefault(require("./routes/likedPost"));
const saved_1 = __importDefault(require("./routes/saved"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)()); // Use CORS middleware for cross-origin requests
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Assuming you want to parse JSON in your routes
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});
app.use('/post', post_1.default);
app.use('/signup', signup_1.default);
app.use('/signin', signin_1.default);
app.use('/profile', profile_1.default);
app.use('/like', like_1.default);
app.use('/likedPost', likedPost_1.default);
app.use('/saved', saved_1.default);
