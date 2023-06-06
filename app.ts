import { initBigQuery } from './bigQuery';
import express, { Router } from 'express';
import { getAllQueryResults } from './controllers/query';
import cors from 'cors';

const app = express();
const router = Router();
const PORT = process.env.PORT || 8080;

app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'https://wax-v1-analytics.vercel.app'] }));

app.listen(PORT, async () => {
    initBigQuery();
    console.log('Big query initialized 💿')
    app.use('',
        router.get('/queries', async (_req, res) => {
            try {
                const queryResults = await getAllQueryResults();
                const resultObj = queryResults.reduce((obj, element) => {
                    obj[element.queryId] = element.results;
                    return obj;
                }, {} as { [queryId: string]: any[] });
                res.status(200).send(resultObj);
            } catch (err) {
                console.log('Error: ', err);
                res.status(500).send('Error occurred');
            }
        })
    );
    return console.log(`🔥 Express is listening at http://localhost:${PORT} 🔥`);
});

