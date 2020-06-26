import React, { useCallback, useRef} from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input';
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText  } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
         console.log(data);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });

/*         await signIn({
          email: data.email,
          password: data.password,
        }); */

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer Login check as Credencias',
        );
      }
    },
    [],
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg}/>
          <Title>Faça seu LogIn</Title>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input 
              autoCorrect={false} 
              autoCapitalize="none" 
              keyboardType="email-address" 
              name="email" 
              icon="mail" 
              placeholder="E-mail" 
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input 
              ref={passwordInputRef}
              name="password" 
              icon="lock" 
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
    
            <Button style={{flexDirection:"row", width: 300}} onPress={ () => {
              formRef.current?.submitForm();
            }}>Entrar</Button>
          </Form>
          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={() =>  navigation.navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#ff9000"/>
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}


export default SignIn