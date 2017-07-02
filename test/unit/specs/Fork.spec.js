import Model from '@/Model/Model'

describe('Fork.js', () => {
  // Setup
  const model = new Model(1)
  const outcomeA = model.createOutcome(() => { return true }, model.createSlug('A'))
  const outcomeB = model.createOutcome(() => { return true }, model.createSlug('B'))
  const fork = model.createFork()
  fork.addOutcome(outcomeA)
  fork.addOutcome(outcomeB)
  it('should render first successfull outcome', () => {
    expect(fork.toString())
      .to.equal('A')
  })
  it('should remove outcomes', () => {
    fork.removeOutcome(outcomeA)
    expect(fork.toString())
      .to.equal('B')
  })
})
