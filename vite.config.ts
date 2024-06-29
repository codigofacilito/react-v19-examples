import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const ReactCompilerConfig = {
  
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ['babel-plugin-react-compiler', ReactCompilerConfig]
      ],
    }
  }), cssInjectedByJsPlugin()],
})
