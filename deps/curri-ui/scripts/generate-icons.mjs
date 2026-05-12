import { execa } from 'execa'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isCI = !!(process.env.CI !== 'false' && process.env.CI)
const isWindows = process.platform === 'win32'

// We don't want to run this in CI environments.
if (!isCI) {
  await execa(
    'svgr --icon --typescript ./src/assets/icons-raw/*.svg --out-dir ./src/components/Icons/components',
    {
      cwd: `${__dirname}/../`,
      shell: isWindows ? 'pwsh' : 'sh',
      stdio: 'inherit',
    }
  )
}
