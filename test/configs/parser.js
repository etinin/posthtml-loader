test('Parser', () => {
  const html = require('../fixtures/index.ssml')
  expect(html).toEqual('<div>Hello</div>')
})
