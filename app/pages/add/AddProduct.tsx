import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

type Props = StackScreenProps<RootStackParamList, 'Add'>;


const AddProduct: React.FC<Props>  = ({ route ,navigation }) => {
  const { register =null} = route.params;
  const { reloadRecords } = useContext(RecordContext);
  const [toUpdate, setToUpdate] = useState(false)

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductTypes>({
    mode: 'all',
    resolver: yupResolver(toUpdate ? modifyProductSchema  : schemaProduct),
  });

  const [releaseDate, setReleaseDate] = useState<Date | undefined>(undefined);
  const [revisionDate, setRevisionDate] = useState<Date | undefined>(undefined);
  const [isReleaseDatePickerVisible, setReleaseDatePickerVisible] = useState(false);
  const [isRevisionDatePickerVisible, setRevisionDatePickerVisible] = useState(false);

  const showReleaseDatePicker = () => {
    setReleaseDatePickerVisible(true);
  };


  const onSubmit = async (data: ProductTypes) => {
    if (toUpdate) {
        const response = await UpdateProductPush(data)
        if (response) {
            reloadRecords()
            handleReset()
            navigation.navigate('Home');
        }
    } else {
        const response = await AddProductPush(data)
        if (response) {
            reloadRecords()
            handleReset()
            navigation.navigate('Home');
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
                date_release: new Date (register.date_release),
                date_revision: new Date (register.date_revision),
              });
              setReleaseDate(new Date (register.date_release));
              setRevisionDate(new Date (register.date_revision));
        } else {
            setToUpdate(false)

        }

    }, [register])
  

  const handleReset = () => {
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
  };

  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.renderContainer}>
        <Text style={style.textTitle}>Formulario de Registro</Text>

        <View style={style.inputContainer}>
          <Text style={style.label}>ID</Text>
          <Controller
            control={control}
            name="id"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[style.textInput, errors.id ? {borderColor: ColorsApp.red} : null]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!toUpdate}
              />
            )}
          />
          {errors.id && <Text style={style.error}>{errors.id.message}</Text>}
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={[style.textInput, errors.name ? {borderColor: ColorsApp.red} : null]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && <Text style={style.error}>{errors.name.message}</Text>}
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Descripción</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[style.textInput, errors.description ? {borderColor: ColorsApp.red} : null]}
                multiline={true}
                numberOfLines={4}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && <Text style={style.error}>{errors.description.message}</Text>}
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Logo</Text>
          <Controller
            control={control}
            name="logo"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[style.textInput, errors.logo ? {borderColor: ColorsApp.red} : null]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.logo && <Text style={style.error}>{errors.logo.message}</Text>}
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Fecha de Liberación</Text>
          <Controller
            control={control}
            name="date_release"
            render={({ field: { onChange } }) => (
              <>
                <TouchableOpacity onPress={showReleaseDatePicker}>
                  <Text style={[style.textInput, errors.date_release ? {borderColor: ColorsApp.red} : null]}>
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
                <View style={{backgroundColor: ColorsApp.lightgray}} >
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
                <Text style={[{color: press ? 'black' :ColorsApp.blue}, style.textButton]} >Enviar</Text>
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
                <Text style={[{color: press ? 'black' :ColorsApp.blue}, style.textButton]} >Reiniciar</Text>
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
