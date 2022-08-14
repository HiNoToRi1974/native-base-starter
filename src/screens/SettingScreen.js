import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AxiosContext } from '../context/AxiosContext'
import { Button } from 'native-base'

const SettingScreen = () => {
  const { logout } = useContext(AxiosContext)

  const logoutHandler = () => {
    logout()
  }

  return (
    <View>
      <Text className="text-red-500">SettingScreen</Text>
      <Button mt="2" colorScheme="primary" size="lg" onPress={logoutHandler} title="">
        ออกจากระบบ
      </Button>
           
    </View>
  )
}

export default SettingScreen