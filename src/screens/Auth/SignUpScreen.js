import React, { useState, useContext } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { EMAIL_REGEX } from "../../constants";
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
import { useForm, Controller } from "react-hook-form";

const SignUpScreen = ({ navigation }) => {
  const { login } = useContext(AxiosContext);

  const [email, setEmail] = useState("admin@hydra.project");
  const [password, setPassword] = useState("hydra");
  const [showPassword, setShowPassword] = useState(false);
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const loginHandler = async () => {
    await login(email, password)
      .then((res) => console.log(res.data))
      .catch((e) => {
        console.log("loginHanler.error", e.response);
      });
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const pwd = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    console.log("errors", errors);
  };

  return (
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            สมัครสมาชิก
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="sm"
          >
            สมัครสมาชิกเพื่อเข้าสู่ระบบการใช้งาน
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={errors.name}>
              <FormControl.Label>ชื่อผู้ใช้</FormControl.Label>
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 5,
                    message: "กรอกชื่อผู้ใช้อย่างน้อย 5 ตัวอักษร",
                  },
                  required: { value: true, message: "ไม่ได้ใส่ชื่อผู้ใช้" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder="ชื่อผู้ใช้งาน"
                    onChangeText={onChange}
                    value={value}
                    size="2xl"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                  />
                )}
                name="name"
              />
              <FormControl.ErrorMessage>
                {errors.name?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.email}>
              <FormControl.Label>อีเมล์</FormControl.Label>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "ไม่ได้ใส่ที่อยู่อีเมล์" },
                  pattern: { value: EMAIL_REGEX, message: "อีเมล์ไม่ถูกต้อง" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder="อีเมล์"
                    onChangeText={onChange}
                    value={value}
                    size="2xl"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="mail-outline" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                  />
                )}
                name="email"
              />
              <FormControl.ErrorMessage>
                {errors.email?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.password}>
              <FormControl.Label>รหัสผ่าน</FormControl.Label>
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 8,
                    message: "กรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร",
                  },
                  required: { value: true, message: "ไม่ได้ใส่รหัสผ่าน" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder="รหัสผ่าน"
                    onChangeText={onChange}
                    value={value}
                    size="2xl"
                    type={showPassword ? "text" : "password"}
                    InputRightElement={
                      <Icon
                        as={
                          <MaterialIcons
                            name={
                              showPassword ? "visibility" : "visibility-off"
                            }
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                  />
                )}
                name="password"
              />
              <FormControl.ErrorMessage>
                {errors.password?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.password_confirmation}>
              <FormControl.Label>รหัสผ่าน</FormControl.Label>
              <Controller
                control={control}
                rules={{
                  validate: (value) => value === pwd || "รหัสผ่านไม่เหมือนกัน",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder="ยืนยันรหัสผ่าน"
                    onChangeText={onChange}
                    value={value}
                    size="2xl"
                    type={showPasswordConfirmation ? "text" : "password"}
                    InputRightElement={
                      <Icon
                        as={
                          <MaterialIcons
                            name={
                              showPasswordConfirmation
                                ? "visibility"
                                : "visibility-off"
                            }
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                        onPress={() =>
                          setShowPasswordConfirmation(!showPasswordConfirmation)
                        }
                      />
                    }
                  />
                )}
                name="password_confirmation"
              />
              <FormControl.ErrorMessage>
                {errors.password_confirmation?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button title="Submit" onPress={handleSubmit(onSubmit)} size="lg">
              สมัครสมาชิก
            </Button>

            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="md"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                มีบัญชีผู้ใช้งานอยู่แล้ว.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "md",
                }}
                onPress={() => navigation.navigate("SignIn")}
              >
                เข้าสู่ระบบ
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
  );
};

export default SignUpScreen;
