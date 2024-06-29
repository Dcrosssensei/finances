import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'


type PropertyContainerProps = {
    children: ReactNode;
  };
  
  const PropertyContainer = ({ children }: PropertyContainerProps) => {
    return (
      <View style={style.propertiesContainer}>
        {children}
      </View>
    )
  }

export default PropertyContainer

const style = StyleSheet.create({
    propertiesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
      },
})