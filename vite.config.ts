import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages はサブパス配信なので相対パスで出力する
  base: './',
  build: {
    // GitHub Pages の公開ソースが docs/ なのでそこへ吐く
    outDir: 'docs',
    emptyOutDir: true,
  },
})
