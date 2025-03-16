import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log('Server listening on port', PORT);
  } catch (error) {
    console.log('Error occurred', error);
  }
});
