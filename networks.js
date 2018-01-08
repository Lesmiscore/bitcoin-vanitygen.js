const bitcoinjs=require("bitcoinjs-lib");
const networks=bitcoinjs.networks;

module.exports = {
    bitcoin: networks.bitcoin,
    bitcoinTestnet: networks.testnet,
    litecoin: networks.litecoin,
    bitzeny: {
        messagePrefix: '\x19Bitzeny Signed Message:\n',
        bip32: {
            public: 0x0488b21e,
            private: 0x0488ade4
        },
        pubKeyHash: 81,
        scriptHash: 0x05,
        wif: 128
    },
    monacoin: {
        messagePrefix: '\x19Monacoin Signed Message:\n',
        bech32: 'mona',
        bip32: {
            public: 0x0488b21e,
            private: 0x0488ade4
        },
        pubKeyHash: 81,
        scriptHash: 0x05,
        wif: 128
    }
}
