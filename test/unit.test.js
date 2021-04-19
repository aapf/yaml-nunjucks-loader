const path = require('path')
const { compile, sleep } = require('./helpers')

jest.setTimeout(5000)

describe('[unit] loader', () => {
  afterAll(async () => {
    await sleep(1000) // wait until webpack releases handles (avoid jest warning)
  })

  test('works with sample1.js', async () => {
    const sample1Path = path.resolve(__dirname, 'sample1.js')
    const modules = await compile(sample1Path)

    const js = modules.find((m) => m.name.endsWith('sample1.js'))
    expect(js).toBeTruthy()
    expect(js.source).toMatch(/var sample1 = require\('.\/sample1\.yaml'\);/)

    const yaml = modules.find((m) => m.name.endsWith('sample1.yaml'))
    expect(yaml).toBeTruthy()
    expect(yaml.source).toMatch(/var nunjucks = require\(".*nunjucks\/browser\/nunjucks-slim.*"\);/)
    expect(yaml.source).toMatch(/var YAML = require\(".*yaml.*"\);/)
    expect(yaml.source).toMatch(/\{"autoescape":false\}/)
    expect(yaml.source).toMatch(/return YAML\.parse\(env\.render\("sample1\.yaml", params\)\);/)
    expect(yaml.source).toMatch(/module\.exports = render;/)
    expect(yaml.source).toMatchSnapshot()
  })

  test('works with sample2.js', async () => {
    const sample2Path = path.resolve(__dirname, 'sample2.js')
    const modules = await compile(sample2Path)

    const js = modules.find((m) => m.name.endsWith('sample2.js'))
    expect(js).toBeTruthy()
    expect(js.source).toMatch(/const sample2 = require\('.\/sample2\.yaml'\);/)

    const yaml = modules.find((m) => m.name.endsWith('sample2.yaml'))
    expect(yaml).toBeTruthy()
    expect(yaml.source).toMatch(/var nunjucks = require\(".*nunjucks\/browser\/nunjucks-slim.*"\);/)
    expect(yaml.source).toMatch(/var YAML = require\(".*yaml.*"\);/)
    expect(yaml.source).toMatch(/\{"autoescape":false\}/)
    expect(yaml.source).toMatch(/return YAML\.parse\(env\.render\("sample2\.yaml", params\)\);/)
    expect(yaml.source).toMatch(/module\.exports = render;/)
    expect(yaml.source).toMatchSnapshot()
  })

  test('works with loader options', async () => {
    const sample2Path = path.resolve(__dirname, 'sample2.js')
    const modules = await compile(sample2Path, 'web', 'development', true, {
      nunjucks: { autoescape: true, throwOnUndefined: true }
    })

    const js = modules.find((m) => m.name.endsWith('sample2.js'))
    expect(js).toBeTruthy()
    expect(js.source).toMatch(/const sample2 = require\('.\/sample2\.yaml'\);/)

    const yaml = modules.find((m) => m.name.endsWith('sample2.yaml'))
    expect(yaml).toBeTruthy()
    expect(yaml.source).toMatch(/var nunjucks = require\(".*nunjucks\/browser\/nunjucks-slim.*"\);/)
    expect(yaml.source).toMatch(/var YAML = require\(".*yaml.*"\);/)
    expect(yaml.source).toMatch(/\{"autoescape":true,"throwOnUndefined":true\}/)
    expect(yaml.source).toMatch(/return YAML\.parse\(env\.render\("sample2\.yaml", params\)\);/)
    expect(yaml.source).toMatch(/module\.exports = render;/)
    expect(yaml.source).toMatchSnapshot()
  })
})
