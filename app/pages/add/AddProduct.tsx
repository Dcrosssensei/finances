import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format, addYears } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProductTypes } from '@/app/models';
import { ColorsApp } from '@/app/constants';
import ButtonPress from '@/app/components/ButtonPress';
import { AddProductPush, UpdateProductPush } from '@/app/api/operations';
import { RecordContext } from '@/app/context/MainContext';
import { RootStackParamList } from '@/app/routes/navigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
import { modifyProductSchema, schemaProduct } from './schema';
import CustomInput from './components/CustomInput';

type Props = StackScreenProps<RootStackParamList, 'Add'>;


const AddProduct: React.FC<Props> = ({ route, navigation }) => {
  const { register = null } = route.params;
  const { reloadRecords } = useContext(RecordContext);
  const [toUpdate, setToUpdate] = useState(false)

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductTypes>({
    mode: 'all',
    resolver: yupResolver(toUpdate ? modifyProductSchema : schemaProduct),
  });

  const [releaseDate, setReleaseDate] = useState<Date | undefined>(undefined);
  const [revisionDate, setRevisionDate] = useState<Date | undefined>(undefined);
  const [isReleaseDatePickerVisible, setReleaseDatePickerVisible] = useState(false);
  const [isRevisionDatePickerVisible, setRevisionDatePickerVisible] = useState(false);

  const showReleaseDatePicker = () => {
    setReleaseDatePickerVisible(true);
  };

  const handleResponse = ()=>{
    reloadRecords()
    handleReset()
    navigation.navigate('Home');
  }


  const onSubmit = async (data: ProductTypes) => {
    if (toUpdate) {
      const response = await UpdateProductPush(data)
      if (response) {
        handleResponse()
      }
    } else {
      const response = await AddProductPush(data)
      if (response) {
        handleResponse()
      }
    }
  };

  useEffect(() => {
    if (register) {
      setToUpdate(true)
      reset({
        id: register.id,
        name: register.name,
        description: register.description,
        logo: register.logo,
        date_release: new Date(register.date_release),
        date_revision: new Date(register.date_revision),
      });
      setReleaseDate(new Date(register.date_release));
      setRevisionDate(new Date(register.date_revision));
    } else {
      setToUpdate(false)

    }

  }, [register])


  const handleReset = () => {
    if (toUpdate && register) {
      reset({
        id: register.id,
        name: '',
        description: '',
        logo: '',
        date_release: undefined,
        date_revision: undefined,
      });
      setReleaseDate(undefined);
      setRevisionDate(undefined);
    } else {
      reset({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: undefined,
        date_revision: undefined,
      });
      setReleaseDate(undefined);
      setRevisionDate(undefined);
    }
  };

  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.renderContainer}>
        <Text style={style.textTitle}>Formulario de Registro</Text>

        <CustomInput
          control={control}
          name='id'
          label='ID'
          errors={errors.id}
          editable={!toUpdate}
        />
        <CustomInput
          control={control}
          name='name'
          label='Nombre'
          errors={errors.name}
        />
        <CustomInput
          control={control}
          name='description'
          label='Descripción'
          errors={errors.description}
        />
        <CustomInput
          control={control}
          name='logo'
          label='Logo'
          errors={errors.logo}
        />

        <View style={style.inputContainer}>
          <Text style={style.label}>Fecha de Liberación</Text>
          <Controller
            control={control}
            name="date_release"
            render={({ field: { onChange } }) => (
              <>
                <TouchableOpacity onPress={showReleaseDatePicker}>
                  <Text style={[style.textInput, errors.date_release ? { borderColor: ColorsApp.red } : null]}>
                    {releaseDate ? format(releaseDate, 'dd/MM/yyyy') : 'Selecciona una fecha'}
                  </Text>
                </TouchableOpacity>
                {isReleaseDatePickerVisible && (
                  <DateTimePicker
                    value={releaseDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setReleaseDatePickerVisible(false);
                        setReleaseDate(selectedDate);
                        onChange(selectedDate);
                        const revisedDate = addYears(selectedDate, 1);
                        setValue('date_revision', revisedDate);
                        setRevisionDate(revisedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          />
          {errors.date_release && <Text style={style.error}>{errors.date_release.message}</Text>}
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Fecha de Revisión</Text>
          <Controller
            control={control}
            name="date_revision"
            render={({ field: { onChange } }) => (
              <>
                <View style={{ backgroundColor: ColorsApp.lightgray }} >
                  <Text style={style.textInput}>
                    {revisionDate ? format(revisionDate, 'dd/MM/yyyy') : 'Selecciona una fecha de Liberacion'}
                  </Text>
                </View>
                {isRevisionDatePickerVisible && (
                  <DateTimePicker
                    value={revisionDate || addYears(releaseDate || new Date(), 1)}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setRevisionDatePickerVisible(false);
                        setRevisionDate(selectedDate);
                        onChange(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          />
          {errors.date_revision && <Text style={style.error}>{errors.date_revision.message}</Text>}
        </View>

        <View style={style.buttonContainer}>
          <ButtonPress
            colorinactive={ColorsApp.yellow}
            colorPress={ColorsApp.darkyellow}
            onPress={handleSubmit(onSubmit)}
          >
            {(press) => (
              <View style={{ alignItems: 'center', }} >
                <Text style={[{ color: press ? 'black' : ColorsApp.blue }, style.textButton]} >Enviar</Text>
              </View>
            )}
          </ButtonPress>
          <ButtonPress
            colorinactive={ColorsApp.softGray}
            colorPress={ColorsApp.lightgray}
            onPress={() => {
              handleReset()
            }}
          >
            {(press) => (
              <View style={{ alignItems: 'center', }} >
                <Text style={[{ color: press ? 'black' : ColorsApp.blue }, style.textButton]} >Reiniciar</Text>
              </View>
            )}
          </ButtonPress>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  renderContainer: {
    padding: 20,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    color: ColorsApp.blue
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: ColorsApp.lightgray,
    borderRadius: 3,
    padding: 10,
    height: 40,
  },
  buttonContainer: {
    rowGap: 10,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  error: {
    fontWeight: '500',
    color: ColorsApp.red,
    fontSize: 12,
  },
  textButton: {
    fontWeight: '600',
    fontSize: 16
  },
});

export default AddProduct;
