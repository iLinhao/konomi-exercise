import { useState } from "react";
import Web3 from 'web3/dist/web3.min.js'
import Web3Modal from 'web3modal';
import styles from "./web3.module.scss";

declare const window: any;

type TransferType = {
    from: string;
    to: string;
    value: string | number;
}

const defaultFormData = {
    from: '',
    to: '',
    amount: ''
}

const Web3Transfer = () => {
	const [formData, setFormData] = useState(defaultFormData);

  const onAddressChange = (e: any) => {
		formData.to = e.target.value;
    setFormData(formData);
  }
  const onAmountChange = (e: any) => {
    formData.amount = e.target.value;
		setFormData(formData);
  }

  const changeNetwork = async (web3: any) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(97) }],
      });
    } catch (switchError: any) {
			alert(switchError?.message);
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3.utils.toHex(97),
                chainName: 'Binance Smart Chain Testnet',
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'] /* ... */,
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

  const transfer = async (web3: any, params: TransferType) => {
    const chainId = await web3.eth.getChainId();
    if (chainId !== 97) {
      await changeNetwork(web3);
      return;
    }
		try {
			await web3.eth.sendTransaction(params)	
		} catch (error) {
			alert(error);
		}
  };

  const connectWallet = async () => {
    let provider = null;
    try {
      provider = await new Web3Modal({}).connect();
    } catch (error) {
      alert('MetaMask connect error!')
    }
    if (provider) {
      const web3 = new Web3(provider);
      window.web3 = web3;
      const accounts = await web3.eth.getAccounts();
      if (accounts && Array.isArray(accounts)) {
        const from = accounts[0];
				const params = {
					from,
					to: formData.to,
					value: web3.utils.toWei(formData.amount.toString(), 'micro')
				}
				console.log(params);
        await transfer(web3, params);
      }
    }
  }

  const transferClick = async () => {
    if(!formData.to || formData.to.length !== 42) {
      alert('address is not correct')
      return
    }
    if(!formData.amount || +formData.amount <= 0) {
      alert('amount is not correct')
      return
    }
    await connectWallet()
  }

  return (
    <div className={styles.transferWrapper}>
      <div className={styles.transfer}>
        <div className={styles.title}>Transfer</div>
        <div className={styles.desc}>Transfer your Token here.</div>
        <div className={styles.item}>
          <div>Address</div>
          <input placeholder="Recipient Address" onChange={onAddressChange} />
        </div>
        <div className={styles.item}>
          <div>Token Amount</div>
          <input type='number' placeholder="Amount" onChange={onAmountChange} />
        </div>
        <div className={styles.tips}>Make sure you have IYO token.</div>
        <div className={styles.confirm} onClick={transferClick}>Transfer</div>
      </div>
    </div>
  )
}

export default Web3Transfer