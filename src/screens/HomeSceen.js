import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Icon } from "native-base";
const HomeSceen = () => {
  //   const dispatch = useDispatch();
  //   const count = useSelector((state) => state.counter.value)
  const [shops, setShops] = useState(null);

  const getProduct = async () => {
    axios.get("https://www.milkretail.com/api/shop").then((res) => {
      setShops(res.data);
    });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <>
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Name"
        />
        <Input size="md" variant="rounded" placeholder="md Input" />
        <Button onPress={() => console.log("hello world")}>Click me</Button>
      </>
    );
  };

  return (
    <>
      {shops && (
        <FlatList
          data={shops}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default HomeSceen;
