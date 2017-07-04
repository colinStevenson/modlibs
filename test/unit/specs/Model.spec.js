import Model from '@/model/model'
const modelScope = {
  apples: 1,
  oranges: 20
}

describe('Model.js', () => {
  it('should set and get its name', () => {
    const model = new Model(1)
    model.setName('Test')
    expect(model.getName())
      .to.equal('Test')
  })
  it('should render slugs properly', () => {
    const model = new Model(1)
    model.addSlug('This ')
    model.addSlug('is working')
    expect(model.toString())
      .to.equal('This is working')
  })
  it('should render slugs with forks properly', () => {
    const model = new Model(1)
    const outcomeA = model.createOutcome(() => { return true }, model.createSlug('working.'))
    const outcomeB = model.createOutcome(() => { return false }, model.createSlug('not working.'))
    const fork = model.createFork()
    fork.addOutcome(outcomeA)
    fork.addOutcome(outcomeB)
    model.addSlug('This is ', fork)
    expect(model.toString())
      .to.equal('This is working.')
  })
  it('should render slugs with nested forks properly', () => {
    const model = new Model(1)
    const subOutcomeA = model.createOutcome(() => { return true }, model.createSlug('well.'))
    const subFork = model.createFork()
    subFork.addOutcome(subOutcomeA)
    const outcomeA = model.createOutcome(() => { return true }, model.createSlug('working ', subFork))
    const outcomeB = model.createOutcome(() => { return false }, model.createSlug('not working ', subFork))
    const fork = model.createFork()
    fork.addOutcome(outcomeA)
    fork.addOutcome(outcomeB)
    model.addSlug('This is ', fork)
    expect(model.toString())
      .to.equal('This is working well.')
  })
  it('should evaluate outcomes based on model scope', () => {
    const model = new Model(1)
    model.setScope(modelScope)
    const outcomeA = model.createOutcome(function () { return this.apples === 1 }, model.createSlug('one apple.'))
    const outcomeB = model.createOutcome(() => { return true }, model.createSlug('an unknown amount of apples.'))
    const fork = model.createFork()
    fork.addOutcome(outcomeA)
    fork.addOutcome(outcomeB)
    model.addSlug('There is ', fork)
    expect(model.toString())
      .to.equal('There is one apple.')
  })
})

