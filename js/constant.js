export const contractaddress=["0x90B4c24ea83B8819cBD39Ec97D57f86f6c70913D",
	"0x2cec50f470f9eb96Df834A73c9227F32f4E310Ec",
	"0xc56Dc331DB9AF7De3034866d989eDEa67d3750f1",
	"0x1dbAB437e6c551eCfFcC49d17d843555453eF871",
	"0x6547D31800ab567C005dCC4D0a67b1725aFa9727",
	"0xAbcab4Fc7E3cfC524bB51D7bb3D542BCFD36313d",
	"0xf7F6c4123a4ce77aaCf57c800988679D6C47dd39",
	"0x3D37Bd056F4733C221713536103c1Dc0e52C7FbE",
	"0x5ad5dBD95fa8548fEF745131C4EB6aaf7a484444",
	"0xE35356229741f47D3Ec55F135D85441D1879F448",
];
//  export const contractaddress="0x90B4c24ea83B8819cBD39Ec97D57f86f6c70913D";
export const abi=[
    
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Fund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "funderTOamt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "funders",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ethAmt",
				"type": "uint256"
			}
		],
		"name": "getConversionrate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minUSD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}

    
];
