import express from 'express';
import expressConfig from './config/express';
import usersRoute from './routes/users';
import userRoute from './routes/user';
import homesRoute from './routes/homes';
import homeRoute from './routes/home';
import homePhotosRoute from './routes/homePhotos';
import worksRoute from './routes/works';
import landRoute from './routes/land';
import messageRoute from './routes/message';
import emailRoute from './routes/send-mail';
import newsRoute from './routes/news';

const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
expressConfig(app);

app.use('/users', usersRoute);
app.use('/user', userRoute);
app.use('/homes', homesRoute);
app.use('/home', homeRoute);
app.use('/home-photos', homePhotosRoute);
app.use('/works', worksRoute);
app.use('/land', landRoute);
app.use('/message', messageRoute);
app.use('/email', emailRoute);
app.use('/news', newsRoute);

export default app;
