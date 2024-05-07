import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let jsonData = {
  message: "Hello, world!"
};

app.get('/data', (req, res) => {
  res.json(jsonData);
});

app.post('/data', async (req, res) => {
  const newData = req.body;

  jsonData = newData

  res.json({ message: "Data updated successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
