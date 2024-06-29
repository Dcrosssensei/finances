import { FlatList, ListRenderItemInfo, StyleSheet} from 'react-native'
import React from 'react'
import RenderItemList from './components/RenderItemList'
import { ProductTypes } from '@/app/models'

interface listProp{
    data: ProductTypes[]
    selectItem: (item: ProductTypes, Index: number) => void
}

const ListRender = ({data, selectItem}:listProp) => {
  return (
    <>
      <FlatList
      data={data}
      renderItem={({ item, index }: ListRenderItemInfo<ProductTypes>) => {
          return (
              <RenderItemList item={item} index={index} selectItem={selectItem} />
            )
        }}   
        /> 
    </>
  )
}

export default ListRender

const styles = StyleSheet.create({
    
})