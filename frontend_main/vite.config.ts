import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env from current directory and parent repository root
  const envLocal = loadEnv(mode, process.cwd(), '');
  const envParent = loadEnv(mode, path.resolve(__dirname, '..'), '');
  
  const rawKey = envLocal.SARVAM_API_KEY || envParent.SARVAM_API_KEY || process.env.SARVAM_API_KEY || '';
  // Strip surrounding quotes and whitespace
  const key = rawKey.replace(/^["']|["']$/g, '').trim();
  const target = envLocal.SARVAM_WS_TARGET || envParent.SARVAM_WS_TARGET || 'https://api.sarvam.ai';

  if (!key && target.includes('sarvam.ai')) {
    console.warn(
      '\n  ⚠️ SARVAM_API_KEY is not set — the voice path will fail to connect.\n' +
        '  Put it in .env as SARVAM_API_KEY=your_key\n',
    );
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/sarvam': {
          target,
          changeOrigin: true,
          ws: true,
          rewrite: (p) => p.replace(/^\/sarvam/, ''),
          configure: (proxy) => {
            proxy.on('proxyReqWs', (req) => {
              if (key) {
                req.setHeader('api-subscription-key', key);
                req.setHeader('API-SUBSCRIPTION-KEY', key);
              }
            });
          },
        },
      },
    },
  };
});
