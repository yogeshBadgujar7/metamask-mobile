import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import React, { useEffect } from "react";

const projectId = "yourProjectID";

const providerMetadata = {
  name: "YOUR_PROJECT_NAME",
  description: "YOUR_PROJECT_DESCRIPTION",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const App = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }

    return open();
  };

  useEffect(() => {
    if (isConnected) {
      fetchBalance();
      fetchTransactionHistory();
    }
  }, [isConnected]);

  const fetchBalance = async () => {
    try {
      const balanceInWei = await provider.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      const balanceInEth = parseFloat(
        parseInt(balanceInWei, 16) / Math.pow(10, 18)
      ).toFixed(4);
      console.log("balanceInEth =>",balanceInEth);
      
      // setBalance(balanceInEth);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const etherscanApiKey = "YOUR_ETHERSCAN_API_KEY"; // Get one from Etherscan
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`
      );
      const data = await response.json();
      if (data.status === "1") {
        console.log("data =>",data?.result);
        
        // setTransactionHistory(data.result);
      } else {
        console.error("Failed to fetch transaction history:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch transaction history:", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://metaium.org/Assets/Img/image.png",
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "rgba(0,0,0,.65)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
            }}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            margin: 20,
            borderRadius: 10,
            width: "80%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 24,
              fontWeight: "700",
              letterSpacing: 2,
              color: "#0B0A0A",
            }}
          >
            META MASK
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 11.5,
              marginTop: 10,
              color: "#201F1F",
              lineHeight: 15,
              marginBottom: 40,
            }}
          >
            Metamask is a software cryptocurrency wallet used to intract with
            the Ethereum blockchain. It allows users to access their Etherium
            wallet through a browser extesion or mobile app.
          </Text>
          {isConnected && (
  <Text
    style={{
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 17,
      fontWeight: '600',
    }}
  >
    Welcome{' '}
    <Text
      style={{
        color: 'blue',
      }}
    >
      {`${address.slice(0, 6)}...${address.slice(-4)}`}
    </Text>
  </Text>
)}
          <TouchableOpacity
            onPress={handleButtonPress}
            style={{
              alignSelf: "center",
              backgroundColor: "#E27625",
              margin: 10,
              marginBottom: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                letterSpacing: 1,
                color: "white",
                fontWeight: "700",
              }}
            >
              {isConnected ? "Connected \n Click to continue." : "Connect Wallet"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text>{isConnected ? address : "No Wallet Connect."}</Text>
      <Pressable onPress={handleButtonPress}>
          <Text>{isConnected ? "Disconnect" : "Connect"}</Text>
      </Pressable> */}
      <WalletConnectModal 
        // explorerRecommendedWalletIds={["0x4280123B8B4bD59C4dF7dBFA62E6A7Ae28D92793"]}
        explorerExcludedWalletIds={"ALL"}
        projectId={projectId}
        providerMetadata={providerMetadata}
        
      />
    </ImageBackground>
  );
};

export default App;
