import { execa } from 'execa'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isWindows = process.platform === 'win32'

if (isWindows) {
  await execa(
    "wsl bash -c -i 'mkdir -p dist/assets && cp -R src/assets dist'",
    {
      cwd: `${__dirname}/../`,
      shell: 'pwsh',
    }
  )
} else {
  await execa('mkdir -p dist/assets && cp -R src/assets dist', {
    cwd: `${__dirname}/../`,
    shell: 'sh',
  })
}
