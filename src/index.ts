import { Transform, TransformCallback } from 'stream'
import { EOL } from 'os'

import File = require('vinyl')

export interface PluginOptions {
  encoding?: BufferEncoding
  eol?: string
}

export function eol({ encoding, eol }: PluginOptions = {}): Transform {
  return new Transform({
    objectMode: true,
    transform(file: File, encode: BufferEncoding, callback: TransformCallback) {
      file.contents = Buffer.from(
        file.contents
          .toString(encoding ?? encode)
          .split(/\r\n|\n|\r/g)
          .join(eol ?? EOL),
        encoding ?? encode
      )
      callback(null, file)
    },
  })
}

export default eol

module.exports = eol
module.exports.default = eol
