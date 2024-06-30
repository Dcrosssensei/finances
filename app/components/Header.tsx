import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { ColorsApp } from "@/app/constants";
import { useNavigation } from "@react-navigation/native";

interface headerProp {
  back: boolean
}

const Header = ({ back }: headerProp) => {
  const navigation = useNavigation();
  return (
    <View style={Style.mainContainer}>
        {back &&
          <View style={Style.backContainer}>
            <  TouchableOpacity onPress={() => navigation.goBack()} >
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        }
      <View style={Style.headerContainer}>
        <FontAwesome5 name="money-bill-alt" size={20} color={ColorsApp.blue} />
        <Text style={Style.text}>BANCO</Text>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: "gray"

  },
  backContainer: {
    flex: 1,
    paddingHorizontal: 5,

  },
  headerContainer: {
    flex: 9,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  text: {
    fontWeight: "800",
    fontSize: 16,
    color: ColorsApp.blue
  }
});

export default Header;
