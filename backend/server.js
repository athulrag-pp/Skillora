import app from './app.js';

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 SKILLORA REAL-TIME PLATFORM SERVER ONLINE`);
  console.log(`👉 PRESENTATION URL: http://localhost:${PORT}/`);
  console.log(`==================================================\n`);
});
