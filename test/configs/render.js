test('Render', () => {
  const html = require('../fixtures/index.html')
  expect(html).toEqual('<div>Hello</div>')
})
