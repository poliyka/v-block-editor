<template>
  <Heading
    :value="value"
    :BlocksIndex="BlocksIndex"
    :placeholder="placeholder"
    fontSize="24px"
  ></Heading>
</template>

<script>
import Heading from "@/components/basicBlockComponents/Heading";

export default {
  name: "Heading2",
  props: ["value", "BlocksIndex"],
  components: {
    Heading,
  },
  data() {
    return {
      placeholder: "標題2",
    };
  },
};
</script>
