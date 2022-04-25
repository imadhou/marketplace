const os = require("os");
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');
require('dotenv').config();



console.log("Reading contract source file ...")
/** Contract source file */
const contractPath = path.resolve(__dirname, 'Marketplace.sol');
console.log(contractPath)
console.log(__dirname)
const source = fs.readFileSync(contractPath, 'utf8');

/** Account address */
const account = process.env.ACCOUNT;

/** Input to use for compiling the source */
console.log("Compiling the source file ...")
const input = {
    language: 'Solidity',
    sources: {
        'Marketplace.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));


/** Set the web3 provider*/
const web3 = new Web3(Web3.givenProvider || process.env.WSPROVIDER);

/** Get the contract file */
const contractFile = tempFile.contracts['Marketplace.sol']['Marketplace'];7

/** Get the byte code to deploy in the blockchain */
const bytecode = contractFile.evm.bytecode.object;

/** Get the abi to use to interact with the smart contract instance */
const abi = contractFile.abi;
fs.writeFileSync('./abi.json', JSON.stringify(abi));


/** Deploy the contract */
(async function () {
    console.log("Deploying the source file ...")
    const contract = new web3.eth.Contract(abi);
    contract.deploy({
      data: bytecode
    }).send({
      from: account,
    }).then((deployment) => {
      console.log('Contract was successfully deployed at the following address:');
      console.log(deployment.options.address);
      setEnvValue('ADDRESS', deployment.options.address)
      process.exit();
    }).catch((err) => {
      console.error(err);
      process.exit();
    });
  })();

  











const envFilePath = path.resolve(__dirname, ".env");
// read .env file & convert to array
const readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL);

/**
 * Updates value for existing key or creates a new key=value line
 */
const setEnvValue = (key, value) => {
  const envVars = readEnvVars();
  const targetLine = envVars.find((line) => line.split("=")[0] === key);
  if (targetLine !== undefined) {
    // update existing line
    const targetLineIndex = envVars.indexOf(targetLine);
    // replace the key/value with the new value
    envVars.splice(targetLineIndex, 1, `${key}=${value}`);
  } else {
    // create new key value
    envVars.push(`${key}=${value}`);
  }
  // write everything back to the file system
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};