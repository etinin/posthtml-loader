test.skip('Options', () => {
  const html = require('../fixtures/index.html')
  expect(html).toContain(/Module build failed:/)
})
