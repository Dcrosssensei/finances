import { View, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import React from 'react'
import { ColorsApp } from '@/app/constants';
import Header from '@/app/components/header/Header';
import ListRender from './components/listComponent/ListRender';
import { ProductTypes } from '@/app/models';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/routes/navigationTypes';
import MainLayout from '@/app/layout/MainLayout';
import ButtonPress from '@/app/components/ButtonPress';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({ navigation }) => {

  const handleSelect = (item: ProductTypes, index: number) => {
    console.log('item', item)
    console.log('index', index)
    navigation.navigate('Details', {
      register: item,
      index: index
    });
  }

  return (
    <MainLayout >
      <Header back={false} />
      <View style={style.mainContainer}>
          <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            placeholder="Search..."
            placeholderTextColor={ColorsApp.gray}
          />
        </View>
        <View style={style.listContainer}>
          <Text style={style.textCount} >Numero de Productos: {jsonprueba?.length}</Text>
          <ListRender data={jsonprueba} selectItem={handleSelect} />
        </View>
        <View style={style.buttonContainer}>
          <ButtonPress
            colorinactive={ColorsApp.yellow}
            colorPress={ColorsApp.darkyellow}
            onPress={() => {
              // handleClick()
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

const jsonprueba = [
  {
    "id": "product-id-001",
    "name": "Producto Innovador A",
    "description": "Producto A ofrece una solución integral con características avanzadas que mejoran la eficiencia y la productividad.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-01",
    "date_revision": "2024-07-10"
  },
  {
    "id": "product-id-002",
    "name": "Producto Revolucionario B",
    "description": "Producto B es conocido por su durabilidad y rendimiento superior en diversas condiciones operativas.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-05",
    "date_revision": "2024-07-12"
  },
  {
    "id": "product-id-003",
    "name": "Producto Sostenible C",
    "description": "Producto C combina tecnología de vanguardia con prácticas sostenibles para un futuro más ecológico.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-07",
    "date_revision": "2024-07-15"
  },
  {
    "id": "product-id-004",
    "name": "Producto Eficiente D",
    "description": "Producto D está diseñado para maximizar la eficiencia energética y reducir los costos operativos.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-10",
    "date_revision": "2024-07-18"
  },
  {
    "id": "product-id-005",
    "name": "Producto Inteligente E",
    "description": "Producto E incorpora inteligencia artificial para ofrecer soluciones personalizadas y mejorar la experiencia del usuario.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-12",
    "date_revision": "2024-07-20"
  },
  {
    "id": "product-id-006",
    "name": "Producto Versátil F",
    "description": "Producto F ofrece versatilidad y adaptabilidad para una amplia gama de aplicaciones y sectores.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-15",
    "date_revision": "2024-07-22"
  },
  {
    "id": "product-id-007",
    "name": "Producto Resistente G",
    "description": "Producto G está construido para resistir las condiciones más extremas, garantizando una larga vida útil.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-18",
    "date_revision": "2024-07-25"
  },
  {
    "id": "product-id-008",
    "name": "Producto Innovador H",
    "description": "Producto H está a la vanguardia de la innovación, ofreciendo soluciones avanzadas para los desafíos actuales.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-20",
    "date_revision": "2024-07-28"
  },
  {
    "id": "product-id-009",
    "name": "Producto Confiable I",
    "description": "Producto I es sinónimo de confiabilidad y rendimiento constante en diversas aplicaciones industriales.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-22",
    "date_revision": "2024-07-30"
  },
  {
    "id": "product-id-010",
    "name": "Producto Avanzado J",
    "description": "Producto J integra las últimas tecnologías para proporcionar un rendimiento superior y una facilidad de uso incomparable.",
    "logo": "https://handsonbanking.org/wp-content/uploads/2021/02/debitcard_front_blue.png",
    "date_release": "2024-07-25",
    "date_revision": "2024-08-01"
  }
]

export default Home