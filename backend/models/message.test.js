const MessageModel = require('./message')

describe('contact model', () => {
  it('should return all contacts', () => {
    expect(MessageModel.find().length).to.not.equal(null)
  })
})
