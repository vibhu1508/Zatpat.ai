import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Not VITE_-prefixed on purpose: this key must never reach the browser
  // bundle. Sarvam's documented browser path is an `api-subscription-key.<key>`
  // subprotocol, which would ship the key to every visitor; proxying the
  // upgrade request and attaching the header here keeps it server-side.
  const env = loadEnv(mode, process.cwd(), '');
  const key = env.SARVAM_API_KEY;
  const target = env.SARVAM_WS_TARGET || 'https://api.sarvam.ai';

  if (!key && target.includes('sarvam.ai')) {
    console.warn(
      '\n  SARVAM_API_KEY is not set — the voice path will fail to connect.\n' +
        '  Put it in Zatpat.ai/.env.local as  SARVAM_API_KEY=your_key\n',
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
              if (key) req.setHeader('API-SUBSCRIPTION-KEY', key);
            });
          },
        },
      },
    },
  };
});
