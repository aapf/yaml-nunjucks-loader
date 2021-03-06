const path = require('path')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')

const outputPath = path.resolve(__dirname, 'output')

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms))
}

function compile(entry, target = 'web', mode = 'development', onMemory = true, options = {}) {
  const qs = () => (Object.keys(options).length > 0 ? `?${JSON.stringify(options, undefined, 0)}` : '')

  const compiler = webpack({
    target,
    mode,
    entry,
    externals: ['nunjucks', 'nunjucks/browser/nunjucks', 'yaml'],
    devtool: 'sourcemap',
    output: {
      path: outputPath,
      filename: path.basename(entry),
      libraryTarget: 'umd' // so that Node.js can import the compiled module
    },
    module: {
      rules: [{ test: /\.yaml$/, use: [{ loader: path.resolve(__dirname, '../loader') + qs() }] }]
    }
  })
  if (onMemory) {
    compiler.outputFileSystem = new MemoryFS()
  }

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats.toJson().modules)
      }
    })
  })
}

module.exports = {
  sleep,
  compile
}
