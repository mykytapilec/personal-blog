import express, { Request, Response } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'personal_blog';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let dbClient: MongoClient;
let db: any;

async function connectDB() {
    dbClient = new MongoClient(MONGO_URI);
    await dbClient.connect();
    db = dbClient.db(DB_NAME);
    console.log('Connected to MongoDB');
}
connectDB().catch(err => console.error('MongoDB connection error:', err));

app.get('/', async (req: Request, res: Response) => {
    const articles = await db.collection('articles').find().toArray();
    res.render('index', { articles });
});

app.get('/article/:id', async (req: Request, res: Response) => {
    const article = await db.collection('articles').findOne({ _id: new ObjectId(req.params.id) });
    if (!article) return res.status(404).send('Article not found');
    res.render('article', { article });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});