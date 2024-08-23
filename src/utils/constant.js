// export const arbitrumId = 42161;
// export const bscId = 56;
// export const polygonId = 137;
// export const mainnetId = 1;
// export const optimismId = 10;

export const arbitrumId = 421614;
export const bscId = 97;
export const polygonId = 80002;
export const optimismId = 11155420;

export const adminWallet = "0x48ede9a182e23a3c7da3fae3a92f85214dcb926e"
export const chainLogos = {
    [bscId]: "/svgs/proj/bsc.svg",
    [polygonId]: "/svgs/proj/polygon.svg",
    [arbitrumId]: "/svgs/proj/arbitrum.svg",
    [optimismId]: "/svgs/proj/optimism.svg"
}

export const categoryIcons = {
    "hackathons": "/assets/icons/popular.svg",
    "ai": "/assets/icons/icons8-ai-64.png",
    "web3": "/assets/icons/icons8-web3-64.png",
    "defi": "/assets/icons/gaming.svg",
    "nfts": "/assets/icons/icons8-nft-64.png",
    "tools": "assets/icons/icons8-tools-64.png",
    "public goods": "/assets/icons/icons8-publicgoods-47.png",
    "scholarships": "/assets/icons/icons8-scholarship-64.png",
    "infrastructure": "/assets/icons/icons8-infrastructure-64.png",
    "entertainment": "icons8-entertainment-64.png",
    "events": "/assets/icons/icons8-events-48.png",
    "gamefi": "/assets/icons/icons8-gamefi-64.png"
}

export const contractAddresses = {
    [bscId]: "0xB2f69C54A366fB1BC4d8b892F7c6e34e368A241b",
    [polygonId]: "0x01970Df11cB5CEed537EEA0aB6D6Dc7366e8DF17",
    [arbitrumId]: "0xcFB8Bf1d64bf4baE08582B5EF464E53326E5bCd4",
    [optimismId]: "0x187a9763FCC7EcFFA9bc50B0fE5BbAe71cDA7b59",
}

export const qfRoundsAddresses = {
    [bscId]: "0x6AEe7760eb44F3694e3F7f9db64159c7B19367F3",
    [polygonId]: "0x1D4b3314C5FF6ea35F46f13cf100F6d2a2e73Bf2",
    [arbitrumId]: "0x789f71868a6fa58f1354e1226f807c51edbee3d6",
    [optimismId]: "0xcFB8Bf1d64bf4baE08582B5EF464E53326E5bCd4",
}

export const votingAddresses = {
    [bscId]: "0xc7DDbBE4cF9d6b4A8461FD7FfB592443664a7f55",
    [polygonId]: "0xC52383b7A22e9687b4863B74D92c3d6c8Cd70F11",
    [arbitrumId]: "0xcFB8Bf1d64bf4baE08582B5EF464E53326E5bCd4",
    [optimismId]: "0x187a9763FCC7EcFFA9bc50B0fE5BbAe71cDA7b59",
}

export const defaultEthLink = {
    [bscId]: "https://bscscan.com/address/",
    [polygonId]: "https://polygonscan.com/address/",
    [arbitrumId]: "https://arbiscan.io/address/",
    [optimismId]: "https://optimistic.etherscan.io/address/"
}

export const txBaseLink = {
    [bscId]: "https://testnet.bscscan.com/tx/",
    [polygonId]: "https://amoy.polygonscan.com/tx/",
    [arbitrumId]: "https://arbiscan.io/address/",
    [optimismId]: "https://optimistic.etherscan.io/address/"
}

export const subgraphURLs = {
    [bscId]: "https://api.studio.thegraph.com/query/72239/youbuidl-bsc/v0.3.7",
    [polygonId]: "https://api.studio.thegraph.com/query/72239/youbuidl-amoy/v0.0.1",
    // [optimismId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuidl-optimism",
    // [arbitrumId]: "https://api.thegraph.com/subgraphs/name/kilros0817/youbuildarbitrum",
}

export const tokenDecimals = {
    [bscId]: {
        ["0x11e3008c59b8a55b7525150c61b12b3fd2415a77"]: 18,
        ["0x5c2d5798ba7d59c381faed3a7a3565c0d51b81a8"]: 18
    },
    [polygonId]: {
        ["0xd194db06a4b2fcf3134c46984f3d3c8770eb4255"]: 18,
        ["0x253335b231f840428d692740edb288ce87a0ddd1"]: 6
    },
}

export const contriTokenLogosByAddress = {
    [bscId]: {
        ["0x11e3008c59b8a55b7525150c61b12b3fd2415a77"]: "/svgs/proj/usdt.svg",
        ["0x5c2d5798ba7d59c381faed3a7a3565c0d51b81a8"]: "/svgs/proj/usdc.png"
    },
    [polygonId]: {
        ["0x253335b231f840428d692740edb288ce87a0ddd1"]: "/svgs/proj/usdt.svg",
        ["0xd194db06a4b2fcf3134c46984f3d3c8770eb4255"]: "/svgs/proj/usdc.png"
    }
}


export const contriTokenLogos = {
    "USDT": "/svgs/proj/usdt.svg",
    "USDC": "/svgs/proj/usdc.png"
}

export const contriTokens = {
    [bscId]: [
        {
            "name": "USDT",
            "address": "0x11e3008c59b8a55b7525150c61b12b3fd2415a77"
        },
        {
            "name": "USDC",
            "address": "0x5c2d5798ba7d59c381faed3a7a3565c0d51b81a8"
        }
    ],
    [polygonId]: [
        {
            "name": "USDT",
            "address": "0x253335b231f840428d692740edb288ce87a0ddd1"
        },
        {
            "name": "USDC",
            "address": "0xd194db06a4b2fcf3134c46984f3d3c8770eb4255"
        }
    ],
    [optimismId]: [
        {
            "name": "USDT",
            "address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
        },
        {
            "name": "USDC",
            "address": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
        }
    ],
    [arbitrumId]: [
        {
            "name": "USDT",
            "address": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
        },
        {
            "name": "USDC",
            "address": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
        }
    ],
}