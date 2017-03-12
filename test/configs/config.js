test('Config', () => {
  const html = require('../fixtures/config/index.ssml')
  expect(html).toEqual('<div>Hello</div>')
})
