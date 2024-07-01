import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext, useRef } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/routes/navigationTypes';
import MainLayout from '@/app/layout/MainLayout';
import { ColorsApp } from '@/app/constants';
import ButtonPress from '@/app/components/ButtonPress';
import PropertyContainer from './components/PropertyContainer';
import { format } from 'date-fns';
import { DeleteProductPush } from '@/app/api/operations';
import { RecordContext } from '@/app/context/MainContext';
import { Modalize } from 'react-native-modalize';
import { Ionicons } from '@expo/vector-icons';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

const Details: React.FC<Props> = ({ route, navigation }) => {
  const { register } = route.params;
  const { reloadRecords } = useContext(RecordContext);

  // TODO: check container with image, skeleton
  
  const modalizeRef = useRef<Modalize>(null);

  const onClose = () => {
    modalizeRef.current?.close();
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleDelete = async (id:string)=>{
    const response = await DeleteProductPush(id);
    if (response) {
      reloadRecords();
      navigation.navigate('Home');
    }
  }

  const handleModfy= ()=>{
    navigation.navigate('Add', {register: register });
  }


  return (
    <MainLayout >
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <View>
            <Text style={style.textMainID} >ID: {register.id}</Text>
            <Text style={style.textSub} >Informacion Extra</Text>
          </View>
          <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
            <PropertyContainer>
              <Text style={style.textTitle}>Nombre</Text>
              <Text style={style.textValue}>{register.name}</Text>
            </PropertyContainer>
            <PropertyContainer>
              <Text style={style.textTitle}>Descripcion</Text>
              <Text style={style.textValue}>{register.description}</Text>
            </PropertyContainer>
            <PropertyContainer>
              <Text style={style.textTitle}>Logo</Text>
              <Image
                style={style.image}
                source={{ uri: register.logo }}
              />
            </PropertyContainer>
            <PropertyContainer>
              <Text style={style.textTitle}>Fecha liberacion</Text>
              <Text style={style.textValue}>{format(register.date_release, 'yyyy-MM-dd')}</Text>
            </PropertyContainer>
            <PropertyContainer>
              <Text style={style.textTitle}>Fecha revision</Text>
              <Text style={style.textValue}>{format(register.date_revision, 'yyyy-MM-dd')}</Text>
            </PropertyContainer>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <ButtonPress
            colorinactive={ColorsApp.softGray}
            onPress={() => {
              handleModfy()
            }}
          >
            {(press) => (
              <View style={{alignItems: 'center'}} >
                <Text style={[{color: press ? 'white' :ColorsApp.blue}, style.textButton]} >Editar</Text>
              </View>
            )}
          </ButtonPress>
          <ButtonPress
            colorinactive={ColorsApp.red}
            colorPress={ColorsApp.softGray}
            onPress={() => {
              onOpen()
            }}
          >
            {(press) => (
              <View style={{alignItems: 'center'}} >
                <Text style={[{color: press ? ColorsApp.red : 'white' }, style.textButton]} >Eliminar</Text>
              </View>
            )}
          </ButtonPress>
        </View>
      </View>

      <Modalize 
      adjustToContentHeight={true}
      onOverlayPress={onClose}
      ref={modalizeRef}>
        <View style={{height: 350, padding: 30, justifyContent: 'space-between', position: 'relative'}}>
          <Ionicons size={20} color={ColorsApp.gray} name='close' style={{position: 'absolute', right: 20, top: 20 }} onPress={()=>{ onClose() }} />
          <View style={{flex: 2, alignContent: 'center', justifyContent: 'center'}}>
            <Text style={style.textModal}>Estas seguro de Eliminar el producto {register.name} </Text>
          </View>
          <View style={{rowGap:10, flex: 1}}>
          <ButtonPress
            colorinactive={ColorsApp.yellow}
            colorPress={ColorsApp.darkyellow}
            onPress={() => {
              handleDelete(register.id)
            }}
          >
            {(press) => (
              <View style={{alignItems: 'center'}} >
                <Text style={[{color: press ? 'white' :ColorsApp.blue}, style.textButton]} >Confirmar</Text>
              </View>
            )}
          </ButtonPress>
          <ButtonPress
            colorinactive={ColorsApp.softGray}
            colorPress={ColorsApp.gray}
            onPress={() => {
              onClose()
            }}
          >
            {(press) => (
              <View style={{alignItems: 'center'}} >
                <Text style={[{color: press ? 'white' : 'black' }, style.textButton]} >Cancelar</Text>
              </View>
            )}
          </ButtonPress>
        </View>
        </View>
      </Modalize>

    </MainLayout>
  )
}

const style = StyleSheet.create({
  image: {
    width: "70%",
    aspectRatio: 16 / 9,
    margin: 'auto'
  },

  textModal: {
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    color: ColorsApp.gray,
  },
  textTitle: {
    fontWeight: '600',
    flex: 3,
    color: ColorsApp.gray,
  },
  textValue: {
    fontWeight: '500',
    flex: 7,
    textAlign: 'right'
  },
  textMainID: {
    fontWeight: '700',
    fontSize: 22
  },
  textSub: {
    color: ColorsApp.gray,
    fontWeight: '500',
  },
  textButton: {fontWeight: '600', fontSize: 16},
  mainContainer:{ paddingHorizontal: 20, paddingVertical: 10 },
  InfoContainer:{ paddingHorizontal: 10, paddingBottom: 10 },
  propetiesContainer:{ paddingHorizontal: 10, paddingTop: 30 },

})


export default Details