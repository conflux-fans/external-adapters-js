import { assert } from 'chai'
import { test } from '../src/bitcoin'

describe('p2pkh', () => {
  context('successful calls', () => {
    it('should generate correct p2pkh script', async () => {
      const res = test()
      const expect = '76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac'
      assert.equal(res, Buffer.from(expect))
    })
  })
})
