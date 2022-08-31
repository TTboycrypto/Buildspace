const main = async () => {
    // grabbing the wallet address of contract owner and randomPerson (contract owner deploys the contract)?
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // Compiles the contract and generates necessary files within artifacts directory.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Hardhat creating local ETH network just for this contract. After script completes Hardhat will destroy that local network. New network each time it conract is ran.
    const waveContract = await waveContractFactory.deploy();
    // waiting for contract to deploy to local ETH network. Constructor will run when deployed.
    await waveContract.deployed();
    // "contract_name"Contract.address gives the address of the deployed contract (Mainnet, testnet, local Blockchain address)
    console.log("Contract deployed to:", waveContract.address);
    // To see the address owner of person deploying this contract
    console.log("Contract deployed by:", owner.address);

    // Manually calling our functions in WavePortal.sol
    // First calling the function to grab the number of waves
    // Then doing the wave. Finally, grabbing the waveCount one more time to see if it changed.

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
    
    waveCount = await waveContract.getTotalWaves();

    // creating random wallet address for our smart contract interaction with local test enviornment.

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
  };

const runMain = async () => {
    try {
        await main();
        process.exit(0); //exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(0); // exit Node process while indicating "Uncaught Fatal Exception error"
    }
};

runMain();

