import File from 'vinyl'
import { Readable } from 'stream'
import { EOL } from 'os'

import eol, { PluginOptions } from '../src'

interface Test {
  options?: PluginOptions
  input?: Buffer
  output?: Buffer
  error?: string
}

const run = async (test: Test) => {
  return new Promise<void>((resolve, reject) => {
    const input = new File({
      contents: test.input,
    })

    try {
      Readable.from([input])
        .pipe(eol(test.options))
        .on('data', (file: File) => {
          if ('equals' in file.contents) {
            expect(file.contents?.equals(test.output)).toBeTruthy()
          }
        })
        .on('end', resolve)
        .on('error', (err) => {
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
  })
}

it('should process default options', () =>
  run({ input: Buffer.from('hello\nworld'), output: Buffer.from(`hello${EOL}world`) }))

it('should support encodings', () =>
  run({
    input: Buffer.from('hello\nworld', 'utf16le'),
    output: Buffer.from(`hello${EOL}world`, 'utf16le'),
    options: { encoding: 'utf16le' },
  }))

it('should support custom eol', () =>
  run({
    input: Buffer.from('hello\nworld'),
    output: Buffer.from('hello\tworld'),
    options: { eol: '\t' },
  }))
