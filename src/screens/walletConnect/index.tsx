import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
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

const WalletConnect = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }

    return open();
  };

  return (
    <ImageBackground
      source={{
        uri: "https://metaium.org/Assets/Img/image.png",
      }}
      style={style.cnt}
    >
      <View style={style.cntBlackView}>
        <View style={style.logoCnt}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png",
            }}
            style={style.logo}
          />
        </View>
        <View style={style.whiteCard}>
          <Text style={style.whiteCardTitle}>META MASK</Text>
          <Text style={style.whiteCardDesc}>
            Metamask is a software cryptocurrency wallet used to intract with
            the Ethereum blockchain. It allows users to access their Etherium
            wallet through a browser extesion or mobile app.
          </Text>
          {isConnected && (
            <Text
              style={{
                textAlign: "center",
                marginBottom: 10,
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              Welcome{" "}
              <Text
                style={{
                  color: "blue",
                }}
              >
                {`${`${address}`.slice(0, 6)}...${`${address}`.slice(-4)}`}
              </Text>
            </Text>
          )}
          <TouchableOpacity onPress={handleButtonPress} style={style.button}>
            <Text style={style.buttonTitle}>
              {isConnected
                ? "Connected \n Click to continue."
                : "Connect Wallet"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <WalletConnectModal
        explorerExcludedWalletIds={"ALL"}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </ImageBackground>
  );
};

export default WalletConnect;

const style = StyleSheet.create({
  cnt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cntBlackView: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoCnt: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: 100,
    width: 100,
    backgroundColor: "white",
    borderRadius: 10,
  },
  whiteCard: {
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
  },
  whiteCardTitle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#0B0A0A",
  },
  whiteCardDesc: {
    textAlign: "center",
    fontSize: 11.5,
    marginTop: 10,
    color: "#201F1F",
    lineHeight: 15,
    marginBottom: 40,
  },
  button: {
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
  },
  buttonTitle: {
    textAlign: "center",
    fontSize: 15,
    letterSpacing: 1,
    color: "white",
    fontWeight: "700",
  },
});
