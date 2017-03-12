test.skip('Error', () => {
  const html = require('../fixtures/index.html')
  expect(html).toContain(/Cannot parse character "<" at 1:1/)
})
