import React, { useState, useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import {
  Center,
  Box,
  VStack,
  HStack,
  Link,
  Text,
  Button,
  FormControl,
  Heading,
  Input,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
const SignInScreen = ({navigation}) => {
  const { login } = useContext(AxiosContext);
  const [email, setEmail] = useState("admin@hydra.project");
  const [password, setfirst] = useState("hydra");
  const [show, setShow] = React.useState(false);
  const loginHandler = async () => {
    await login(email, password)
      .then((res) => console.log(res.data))
      .catch((e) => {
        console.log("loginHanler.error", e.response);
      });
  };
  const goToSignUp = () => {
    
  }
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="2xl"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          เข้าใข้ระบบ
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          เข้าสู่ระบบการใช้งานระบบ
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>อีเมล์</FormControl.Label>
            <Input
              value={email}
              onChangeText={val => setEmail(val)} 

              size="2xl"

              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="อีเมล์"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>รหัสผ่าน</FormControl.Label>
            <Input
              value={password}
              onChangeText={val => setPassword(val)} 
              size="2xl"
              type={show ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
              placeholder="รหัสผ่าน"
            />
            {/* <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link> */}
          </FormControl>
          <Button mt="2" size="lg" onPress={loginHandler}>
            เข้าสู่ระบบ
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="md"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              ยังไม่มีบัญชีผู้ใช้งาน.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "md",
              }}
              onPress={() => navigation.navigate('SignUp')}
            >
              สร้างบัญชีผู้ใช้งาน
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignInScreen;
