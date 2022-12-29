import express from 'express';
import expressConfig from './config/express.js';
import databaseConfig from './config/db.js';
import usersRoute from './routes/users.js';
import userRoute from './routes/user.js';
import homesRoute from './routes/homes.js';
import homeRoute from './routes/home.js';
import homePhotosRoute from './routes/homePhotos.js';
import worksRoute from './routes/works.js';
import landRoute from './routes/land.js';
import messageRoute from './routes/message.js';
import emailRoute from './routes/send-mail.js';
import newsRoute from './routes/news.js';
import authRoutes from './routes/auth.js';
import visitationRoute from './routes/visitation.js';
import meetingRoute from './routes/meeting.js';

start();

async function start() {
  const app = express();
  await databaseConfig(app);
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
  app.use('/auth', authRoutes);
  app.use('/visitation', visitationRoute);
  app.use('/meetings', meetingRoute);

  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => console.log(`Server listen on port 3030`));
}
