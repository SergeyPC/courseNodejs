import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("Токен отсутствует!");
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) {
      console.log("Ошибка верификации токена:", err);
      return res.status(403).json({ error: 'Invalid access token' });
    }
    console.log("Токен валиден! Пользователь:", user);
    req.user = user;
    next();
  });
};
