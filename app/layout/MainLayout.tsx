import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ColorsApp } from '../constants'

type MainLayoutProps = {
    children: ReactNode;
  };
  

const MainLayout = ({children}:MainLayoutProps) => {
  return (
    <SafeAreaView style={style.main}>
        {children}
    </SafeAreaView>
  )
}

export default MainLayout

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorsApp.base
    
      },
})