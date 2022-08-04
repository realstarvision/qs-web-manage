import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import { api, geo } from './src/configa.js'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[name]',
  }),],
  server: {
    host: 'localhost',
    port: 3001,
    proxy: {
      '/api': {
        target: "http://192.168.148.33:8054",
        // target: "http://192.168.48.241.:8054",
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/geo': {
        target: "http://192.168.148.33:8051",
        // target: "http://192.168.48.241.:8054",
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
        rewrite: (path) => path.replace(/^\/geo/, '')
      },
      "/gateway": {
        target: "http://192.168.148.33:8056",
        // target: "http://192.168.48.241.:8054",
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
        rewrite: (path) => path.replace(/^\/gateway/, '')
      },
      "/data-set": {
        target: "http://192.168.148.33:8055",
        // target: "http://192.168.48.241.:8054",
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
        rewrite: (path) => path.replace(/^\/data-set/, '')
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': '/src'
    }
  },
  css: {
    // postcss: {
    //   plugins: [
    //     require('postcss-pxtorem')({ // 把px单位换算成rem单位
    //       rootValue: 32, // 换算基数，默认100，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
    //       propList: ['*'], //属性的选择器，*表示通用
    //       unitPrecision: 5, // 允许REM单位增长到的十进制数字,小数点后保留的位数。
    //       exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法
    //     })
    //   ]
    // }
    // 配置全局css
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/global.scss";'
      }
    }
  }

})
