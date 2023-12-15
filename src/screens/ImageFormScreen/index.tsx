import React, {useCallback, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useFormik} from 'formik';

interface FormValues {
  image: ImagePickerResponse | null;
  name: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required('Выберите изображение'),
  name: Yup.string()
    .matches(/^[а-яА-Я]+$/, 'Имя должно содержать только буквы кириллицы')
    .matches(/^\S*$/, 'Имя не должно содержать пробелы')
    .required('Введите имя'),
  description: Yup.string()
    .min(10, 'Описание должно содержать минимум 10 символов')
    .required('Введите описание'),
});

function ImageFormScreen(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
      <ImageUploadForm />
    </View>
  );
}

function ImageUploadForm(): React.JSX.Element {
  const [imageSource, setImageSource] = useState<ImagePickerResponse | null>(
    null,
  );

  const imageLibraryOptions: ImageLibraryOptions = {mediaType: 'photo'};

  const assembleData = async (values: FormValues) => {
    const data = new FormData();
    data.append('image', {
      uri: values.image?.assets?.[0].uri,
      type: values.image?.assets?.[0].type,
      name: values.image?.assets?.[0].fileName,
    });
    data.append('name', values.name);
    data.append('description', values.description);
    // После этого data можно отправить в запросе POST с 'Content-Type': 'multipart/form-data; ' в headers
    Alert.alert('Сообщение', 'Данные успешно отправлены');
  };

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      initialValues: {image: null, name: '', description: ''},
      validationSchema,
      onSubmit: assembleData,
    });

  const handleSubmitPress = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const pickImage = () => {
    launchImageLibrary(imageLibraryOptions, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('Отменено пользователем');
      } else if (response.errorMessage) {
        console.log('Ошибка выбора изображения:', response.errorMessage);
      } else {
        setImageSource(response);
        handleChange({
          target: {
            name: 'image',
            value: response,
          },
        });
      }
    });
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets style={styles.scrollView}>
      <TouchableOpacity onPress={pickImage} style={styles.imageTouchable}>
        {imageSource ? (
          <Image
            source={{uri: imageSource.assets?.[0].uri}}
            style={styles.imageStyle}
          />
        ) : (
          <Text>Выбрать изображение</Text>
        )}
      </TouchableOpacity>
      {touched.image && errors.image && (
        <Text style={styles.errorText}>{errors.image}</Text>
      )}

      <TextInput
        placeholder="Имя"
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={values.name}
      />
      {touched.name && errors.name && (
        <Text style={styles.errorText}>{errors.name}</Text>
      )}

      <TextInput
        placeholder="Описание"
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        value={values.description}
        multiline
      />
      {touched.description && errors.description && (
        <Text style={styles.errorText}>{errors.description}</Text>
      )}

      <Button title="Отправить" onPress={handleSubmitPress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  imageTouchable: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: 'red',
  },
  scrollView: {
    padding: 20,
  },
});

export default ImageFormScreen;
