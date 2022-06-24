const randomStatus = () => {
  return Math.ceil(Math.random() * 3)
}

const randomId = () => {
  return `${Math.random() * 1000}-${new Date().getTime()}`;
}

const generateData = () => {
  return {
    id: randomId(),
    blockNumber: 12297450,
    transactionIndex: 6,
    sources: [
      0, 1, 2, 3
    ],
    symbol: "eth",
    slug: "ethereum",
    leaseEnd: 12499050,
    subscriptionId: 7,
    networkId: 0,
    aggregationStrategy: 1,
    reportingStrategy: 0,
    status: randomStatus(),
    client: {
      clientType: 0,
      connectionInfo: {
        contractAddress: "0x0F9dfd6043965B02e74D01188c13936fBE71D688",
        networkId: 0
      }
    },
    createdTimestamp: new Date(),
    updatedTimestamp: new Date(),
    display: true
  }
}

export const getCoinList = async () => {

  const result: any = [];

  for (let index = 0; index < 8; index++) {
    result.push(generateData())
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 2000);
  });
}