test('Template', () => {
  const template = require('../fixtures/template.ssml')

  const html = template({ hello: 'Hello World!' })

  expect(html).toEqual('<div>Hello World!</div>')
})
