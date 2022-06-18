const ContactModel = require('./contact')

describe('contact model', () => {
  it('should return all contacts', () => {
    expect(ContactModel.find().length).to.not.equal(null)
  })
})
