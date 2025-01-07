import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  ImageBackground,
  Image,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { PaymentDetailArray, PaymentProfilePics } from "../../assets/json";

const HomeScreen = () => {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const Provider: any = provider;

  const handlePayEth = async () => {
    if (!isConnected) {
      Alert.alert("Wallet not connected", "Please connect your wallet first.");
      return;
    }

    setData({
      ...data,
      loading: true,
    });

    try {
      const tx = {
        from: address, // Your wallet address
        to: "0x5436159e7EC97181101CE2A23bf1ae13c8117FdA", // Replace with recipient address
        value: `0x${(0.01 * 1e18).toString(16)}`, // Value in Wei (e.g., 0.01 ETH)
        gas: "0x5208", // 21000 gas limit (standard for ETH transfers)
      };

      const txHash = await Provider.request({
        method: "eth_sendTransaction",
        params: [tx],
      });

      //   Alert.alert("Transaction Sent", `Tx Hash: ${txHash}`);
      console.log("Transaction Hash:", txHash);
      setData({
        ...data,
        loading: false,
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Payment failed:", error);
      setData({
        ...data,
        loading: false,
        success: false,
        error: true,
      });
      //   Alert.alert("Payment Failed", error.message || "Something went wrong.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://metaium.org/Assets/Img/image.png",
      }}
      style={style.cnt}
    >
      <View style={style.cntBlackView}>
        <View style={style.whiteCard}>
          <Text
            style={{
              color: isConnected ? "green" : "red",
            }}
          >
            ◉ Meta Mask {isConnected ? "Connected" : "Not-Connected"}
          </Text>
          {/* Accoutn icon and name detail. */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {PaymentProfilePics.map((item, index) => {
              return (
                <View key={item.id}>
                  <Image
                    source={{
                      uri: item?.url,
                    }}
                    style={[
                      {
                        height: 80,
                        width: 80,
                        borderRadius: 1000,
                        margin: 5,
                      },
                      item?.style && item?.style,
                    ]}
                    resizeMode="contain"
                  />
                  {item?.title && (
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 15,
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {item?.title}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
          {/* Amount Detail */}
          <Text
            style={{
              fontSize: 40,
              alignSelf: "center",
              color: "#201F1F",
              marginTop: 20,
            }}
          >
            $20.00
          </Text>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            "Dmart Shopping"
          </Text>

          {/* Transaction Detail */}
          <View
            style={{
              marginTop: 20,
            }}
          />
          {PaymentDetailArray.map((item) => {
            return (
              <View
                key={item?.id}
                style={[
                  {
                    borderTopWidth: 1,
                    padding: 10,
                    marginVertical: 0,
                    marginBottom: 0,
                    flexDirection: "row",
                  },
                  item?.id === 4 && {
                    backgroundColor: "lightgrey",
                  },
                ]}
              >
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      fontWeight: "700",
                    }}
                  >
                    {item?.title}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {item?.value}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      marginTop: 5,
                    }}
                  >
                    {item?.walletAdd}
                  </Text>
                </View>
              </View>
            );
          })}
          {data.error ? (
            <Text
              style={{
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
                color: "red",
                fontWeight: "600",
              }}
            >
              Payment failed please try again.
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handlePayEth}
              style={{
                padding: 10,
                backgroundColor: data?.success ? "green" : "#E27625",
                alignSelf: "center",
                marginTop: 20,
                paddingHorizontal: 30,
                borderRadius: 2,
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
                  fontSize: 15,
                  fontWeight: "600",
                  color: "white",
                  letterSpacing: 0.9,
                }}
              >
                {data?.loading ? (
                  <ActivityIndicator color={"white"} size={"small"} />
                ) : data.success ? (
                  "PAYMENT SUCCESS"
                ) : (
                  "CONFIRM"
                )}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

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
});

export default HomeScreen;
