import { View, StyleSheet, Text, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { ColorsApp } from '@/app/constants';
import ListRender from './components/listComponent/ListRender';
import { ProductTypes } from '@/app/models';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/routes/navigationTypes';
import MainLayout from '@/app/layout/MainLayout';
import ButtonPress from '@/app/components/ButtonPress';
import { RecordContext } from '@/app/context/MainContext';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {

  const { records, loading } = useContext(RecordContext);
  const [data, setData] = useState<ProductTypes[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  const handleSelect = (item: ProductTypes, index: number) => {
    navigation.navigate('Details', {
      register: item,
      index: index
    });
  }

  useEffect(() => {
    if (!loading) {
      setData(records)
    }
  }, [ records])

  useEffect(() => {
    if (filter && !loading) {
      setData(records.filter((record)=> record.name.toLowerCase().includes(filter.toLowerCase())))
    }
  }, [filter])
  
  

  return (
    <MainLayout >
      <View style={style.mainContainer}>
          <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            placeholder="Search..."
            placeholderTextColor={ColorsApp.gray}
            onChangeText={(text)=> setFilter(text)}
          />
        </View>
        <View style={style.listContainer}>
          <Text style={style.textCount} >Numero de Productos: {data?.length}</Text>
          <ListRender data={data} selectItem={handleSelect} />
        </View>
        <View style={style.buttonContainer}>
          <ButtonPress
            colorinactive={ColorsApp.yellow}
            colorPress={ColorsApp.darkyellow}
            onPress={() => {
              navigation.navigate('Add', { });
            }}
          >
            {(press) => (
              <View style={{ alignItems: 'center', }} >
                <Text style={ style.textButton} >Agregar</Text>
              </View>
            )}
          </ButtonPress>
        </View>
      </View>
    </MainLayout>
  )
}

const style = StyleSheet.create({
  listContainer: {
    height: '70%',
    gap: 10
  },
  buttonContainer: {
    paddingVertical: 10
  },
  mainContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    flex: 1,
    justifyContent:"space-between"
  },
  textButton: {
    fontWeight: '600', 
    fontSize: 16
  },
  textCount: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  inputContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderColor: '#ddd',
    borderWidth: 1.5,
  },

})

export default Home