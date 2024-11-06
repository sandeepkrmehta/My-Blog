import express from 'express';
import { connectToDb, db } from '../config/DB.js';

const app = express();
app.use(express.json());

    // GET article info by name
    app.get('/api/articles/:name', async (req, res) => {
        const { name } = req.params;
        try {
            const article = await db.collection('articles').findOne({ name });
            if (article) {
                res.send(article);
            } else {
                res.status(404).send("Article not found.");
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching article.' });
        }
    });

    // PUT to upvote an article
    app.put('/api/articles/:name/upvote', async (req, res) => {
        const { name } = req.params;
        try {
            const result = await db.collection('articles').findOneAndUpdate(
                { name },
                { $inc: { upvotes: 1 } },
                { returnDocument: 'after' }
            );
            if (result.value) {
                res.json(result.value);
            } else {
                res.status(404).send("Article not found.");
            }
        } catch (error) {
            res.status(500).json({ error: 'Error upvoting article.' });
        }
    });

    // POST a new comment to an article
    app.post('/api/articles/:name/comments', async (req, res) => {
        const { name } = req.params;
        const { postedBy, text } = req.body;
        try {
            const result = await db.collection('articles').findOneAndUpdate(
                { name },
                { $push: { comments: { postedBy, text } } },
                { returnDocument: 'after' }
            );
            if (result.value) {
                res.json(result.value.comments);
            } else {
                res.status(404).send("Article not found.");
            }
        } catch (error) {
            res.status(500).json({ error: 'Error posting comment.' });
        }
    });

    // Start the server after the database is connected
    
connectToDb(() => {
    console.log("MongoDB Connected Sucessfully !!");
    const port = 8000;
    app.listen(8000, () => {
        console.log('Server is listening on port: 8000');
    });
});