import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      server: {
        deps: {
          inline: ['vuetify']
        }
      },      
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporter: ["junit", "default"],
      outputFile: "./test-results.xml",
      coverage: {
        reporter: ['text', 'html', 'cobertura'],
        reportsDirectory: './coverage',
        exclude: ['**/*.cjs', '**/plugins', '**/main.js'],
      },      
    }
  })
)
