import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          // No catch-all node_modules group: hls.js must stay in its own
          // lazily-loaded chunk created by the dynamic import in HlsVideo.
          groups: [
            {
              name: 'react',
              test: /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//,
            },
            {
              name: 'framer-motion',
              test: /node_modules\/(framer-motion|motion-dom|motion-utils)\//,
            },
            {
              name: 'gsap',
              test: /node_modules\/gsap\//,
            },
          ],
        },
      },
    },
  },
})
