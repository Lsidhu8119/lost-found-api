import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Lost & Found API is live at http://localhost:${PORT}`);
});
