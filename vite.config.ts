import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const keycloakPort = parseInt(env.VITE_KEYCLOAK_PORT, 10)
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '::',
      port: keycloakPort,
	 https: {
        key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),  // Load key.pem
        cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')), // Load cert.pem
      },
   
 },
  }
})
