test('Plugins', () => {
  const html = require('../fixtures/index.html')
  expect(html).toEqual('<section>Hello</section>')
})
