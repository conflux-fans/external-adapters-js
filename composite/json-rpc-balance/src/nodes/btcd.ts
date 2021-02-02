import { BalanceResponse } from '../adapter'
import { BigNumber } from 'ethers'

type Transaction = {
  vin: {
    coinbase?: string
    prevOut?: {
      addresses: string[]
      value: number
    }
  }[]
  vout: {
    value: number
    scriptPubKey: {
      addresses: string[]
    }
  }[]
  confirmations: number
}

export const getBalances = async (
  addresses: string[],
  minConfirmations = 1,
): Promise<BalanceResponse> => {
  const balances: Record<string, BigNumber> = {}
  let total = BigNumber.from(0)

  const promises = []
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i]
    const _fetchUnspentBalance = async (): Promise<void> => {
      const balance = await getUnspentBalance(address, minConfirmations)
      balances[address] = balance
      total = total.add(balance)
    }
    promises.push(_fetchUnspentBalance)
  }

  await Promise.all(promises)

  return {
    addresses: balances,
    result: total,
  }
}

const getUnspentBalance = async (address: string, minConfirmations: number): Promise<BigNumber> => {
  const txs = (await searchRawTxs(address)).filter((tx) => tx.confirmations >= minConfirmations)
  const txsOut = txs
    .filter((tx) =>
      tx.vin.filter((vin) => vin.prevOut && vin.prevOut.addresses.indexOf(address) >= 0),
    )
    .map((tx) => tx.vin.map((vin) => BigNumber.from(vin.prevOut?.value)))
    .flat() as BigNumber[]

  const txsIn = txs
    .filter((tx) => tx.vout.filter((vout) => vout.scriptPubKey.addresses.indexOf(address) >= 0))
    .map((tx) => tx.vout.map((vout) => BigNumber.from(vout.value)))
    .flat() as BigNumber[]

  const totalOut = txsOut.reduce((sum, out) => sum.add(out), BigNumber.from(0))
  const totalIn = txsIn.reduce((sum, inn) => sum.add(inn), BigNumber.from(0))

  return totalIn.sub(totalOut)
}

const searchRawTxs = async (address: string): Promise<Transaction[]> => {
  const allTxs = []
  let skip = 0
  const count = 100
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const txs = await queryRawTx(address, skip, count)
    allTxs.push(...txs)
    if (txs.length < count) break
    skip += count
  }
  return allTxs
}

const queryRawTx = async (
  address: string,
  skip: number,
  count: number,
): Promise<Transaction[]> => {}
