import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './interfaces/routes/auth.routes';
import profileRoutes from './interfaces/routes/profile.routes';
import userRoutes from './interfaces/routes/user.routes';

import { sendSuccess, sendError } from './utils/response';

const app = express();

// 🔐 Security middleware
app.use(helmet());

// 📦 Body parser
app.use(express.json());

// 📜 HTTP logger
app.use(morgan('dev'));

// 🚫 Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: 'error', message: 'Too many requests, please try again later.' },
  })
);

// 🟢 Health check
app.get('/', (req, res) => {
  const data = {
    service: 'RBAC API',
    version: '1.0.0',
    uptime: `${process.uptime().toFixed(2)}s`,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      users: '/api/users (ADMIN only)',
    },
  };

  if (req.headers.accept?.includes('text/html')) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RBAC API</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0;
                 display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 30px; border-radius: 12px;
                  box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 420px; }
          h1 { margin-top: 0; color: #38bdf8; }
          .item { margin: 10px 0; display: flex; justify-content: space-between; gap: 12px; }
          .label { font-weight: bold; color: #94a3b8; white-space: nowrap; }
          .badge { background: #0f172a; padding: 2px 10px; border-radius: 6px; font-size: 13px; color: #7dd3fc; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 RBAC API</h1>
          <div class="item"><span class="label">Service</span><span>${data.service}</span></div>
          <div class="item"><span class="label">Version</span><span class="badge">v${data.version}</span></div>
          <div class="item"><span class="label">Uptime</span><span>${data.uptime}</span></div>
          <div class="item"><span class="label">Time</span><span>${data.timestamp}</span></div>
          <hr style="border-color:#334155; margin: 16px 0"/>
          <div class="item"><span class="label">Auth</span><span class="badge">/api/auth</span></div>
          <div class="item"><span class="label">Profile</span><span class="badge">/api/profile</span></div>
          <div class="item"><span class="label">Users</span><span class="badge">/api/users</span></div>
        </div>
      </body>
      </html>
    `);
  }

  return sendSuccess(res, data, 'Service is running 🚀');
});

// 🔑 Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);

// ❌ Global error handler
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  return sendError(res, err.message || 'Internal Server Error', 500);
});

// ❌ 404 handler
app.use((req, res) => {
  return sendError(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
});

export default app;