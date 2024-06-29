import { GestureResponderEvent, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ColorsApp } from '@/app/constants'
import { ProductTypes } from '@/app/models'

interface renderItemsProps {
    item: ProductTypes
    index: number
    selectItem: (item: ProductTypes, Index: number) => void
}

const RenderItemList = ({ item, index, selectItem }: renderItemsProps) => {
    return (
        <TouchableHighlight 
            style={styles.containerRender} 
            onPress={(event:GestureResponderEvent)=> selectItem(item, index)}
            underlayColor={ColorsApp.lightgray}
        >
            <>
                <View style={styles.elementsRender} >
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text style={styles.textID}>ID: {item.id}</Text>
                </View>
                <MaterialIcons style={styles.icon} name="arrow-forward-ios" size={16} color={ColorsApp.lightgray} />
            </>

        </TouchableHighlight>
    )
}

export default RenderItemList

const styles = StyleSheet.create({
    containerRender: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        alignItems: 'center'
    },
    elementsRender: {
        flex: 9
    },
    icon: {
        flex: 1
    },
    textName: {
        fontWeight: '700'
    },
    textID: {
        color: ColorsApp.gray,
        fontWeight: '500'
    }
})