import React from 'react'
import { Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button'


import logoImg from '../../assets/logo.png';


import { Container, Title, BackToSignin, BackToSigninText  } from './styles';
const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return(
    <>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg}/>
          <Title>Crie sua conta</Title>
  
          <Input name="name" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha"/>
  
          <Button onPress={ () => { console.log("Deu")}}>Entrar</Button>
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