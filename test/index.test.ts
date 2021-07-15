import File from 'vinyl'
import { Readable } from 'stream'
import { EOL } from 'os'

import eol, { PluginOptions } from '../src'

interface Test {
  options?: PluginOptions,
  input?: string,
  output?: string,
  error?: string
}

const run = async (test: Test) => {
  return new Promise<void>(((resolve, reject) => {
    const input = new File({
      contents: test.input == undefined ? undefined : Buffer.from(test.input)
    })

    try {
      Readable.from([input])
        .pipe(eol())
        .on('data', (file: File) => {
          expect(file.contents?.toString()).toEqual(test.output)
        })
        .on('end', resolve)
        .on('error', err => {
          if (test.error) {
            expect(test.error).toEqual(err.message)
            return resolve()
          }

          reject(err)
        })
    } catch (e) {
      if (test.error) {
        expect(test.error).toEqual(e.message)
        return resolve()
      }

      reject(e)
    }
  }))
}

it('should process default options', async () => run({ input: 'hello\nworld', output: `hello${EOL}world` }))
