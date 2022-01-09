<template>
  <Heading
    :value="value"
    :BlocksIndex="BlocksIndex"
    :placeholder="placeholder"
    fontSize="30px"
  ></Heading>
</template>

<script>
import Heading from "@/components/basicBlockComponents/Heading";

export default {
  name: "Heading1",
  props: ["value", "BlocksIndex"],
  components: {
    Heading,
  },
  data() {
    return {
      placeholder: "標題1",
    };
  },
};
</script>
