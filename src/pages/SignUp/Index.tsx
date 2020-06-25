import React, {useRef} from 'react'
import { Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Form} from '@unform/mobile'
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button'


import logoImg from '../../assets/logo.png';


import { Container, Title, BackToSignin, BackToSigninText  } from './styles';
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);


  return(
    <>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg}/>
          <Title>Crie sua conta</Title>
          <Form 
            ref={formRef} 
            onSubmit={(data) => {
              console.log(data)
            }}>
            <Input 
              autoCapitalize="words" 
              name="name" 
              icon="user" 
              placeholder="Nome"
              returnKeyType="next" 
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef} 
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
              secureTextEntry 
              name="password" 
              icon="lock" 
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={ () => formRef.current?.submitForm() }
            />
            <Button onPress={ () => formRef.current?.submitForm() }>Entrar</Button>
          </Form>
        </Container>
      </ScrollView>
      <BackToSignin onPress={ () => navigation.navigate("SignIn") }>
        <Icon name="arrow-left"  size={20} color="#fff"/>
        <BackToSigninText>Voltar para o SignIn</BackToSigninText>
      </BackToSignin>
    </>
  )
}

export default SignUp