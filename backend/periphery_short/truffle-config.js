require('dotenv').config();

var HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
	networks: {
		develop: {
			host: 'localhost',
			port: 7545, // Match default network 'ganache'
			network_id: 5777,
			gas: 6721975, // Truffle default development block gas limit
			gasPrice: 200000000000,
			solc: {
				version: '0.5.0',
				optimizer: {
					enabled: true,
					runs: 200
				}
			}
		},
		ropsten: {
			networkCheckTimeout: 100000,
			provider: function () {
				return new HDWalletProvider(
					process.env.OPERATOR_PRIVATE_KEY,
					'https://eth-ropsten.alchemyapi.io/v2/92hnrLmR4KE0kyVFGNFTJXyNavPMR6ob'
				);
			},
			network_id: 3,
			gas: 6721975
		}
	},
	rpc: {
		host: 'localhost',
		post: 8080
	},
	mocha: {
		useColors: true
	},
	compilers: {
		solc: {
			version: '0.6.6'
		}
	}
};
