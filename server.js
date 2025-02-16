import http from 'http';

const server = http.createServer((req, res) => {
  const delay = Math.floor(Math.random() * 3000) + 1000;
  
  const isError = Math.random() < 0.1;
  
  setTimeout(() => {
    if (isError) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Request handled successfully');
    }
  }, delay);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
