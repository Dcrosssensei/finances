import { FlatList, ListRenderItemInfo} from 'react-native'
import React from 'react'
import RenderItemList from './components/RenderItemList'
import { ProductTypes } from '@/app/models'
import ListEmptyComponent from './components/ListEmptyComponent'

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
          }
        }   
        ListEmptyComponent={
          <ListEmptyComponent />
        }
      /> 
    </>
  )
}

export default ListRender
