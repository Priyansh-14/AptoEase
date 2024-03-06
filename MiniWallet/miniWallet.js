require('dotenv').config();

const { Web3 } = require('web3');

const web3 = new Web3('https://ethereum-sepolia.publicnode.com');

async function sendTransaction() {
    const accountTo = web3.eth.accounts.create();
    console.log("Account To:", accountTo);

    const privatekey = process.env['privatekey'];

    const accountFrom = web3.eth.accounts.privateKeyToAccount(privatekey);
    console.log("Account From:", accountFrom);

    const wallet = web3.eth.accounts.wallet.add(accountFrom.privateKey);

    console.log('Account 1:', wallet[0]);

    const _to = accountTo.address;
    const _value = '0.001';
    
    const receipt = await web3.eth.sendTransaction({
      from: wallet[0].address,
      to: _to,
      value: web3.utils.toWei(_value, 'ether'),
    });

    console.log('Tx receipt:', receipt);
}

sendTransaction().catch(error => console.error(error));
