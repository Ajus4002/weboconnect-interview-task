import express from 'express';
import cors from 'cors'
import './configration/config.js'
import path from 'path';
import './model/index.js'
import fileUpload from 'express-fileupload';
import apiRouter from  './router/index.js'


const app = express();
const port = process.env.PORT

app.set('view engine', 'ejs');
app.set('views', path.join('views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));


app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

