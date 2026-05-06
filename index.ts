import app from './src/app';
import { ENV } from './src/config/env';
import { logger } from './src/config/logger';

const PORT = ENV.PORT;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});