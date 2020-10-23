<template>
  <Heading
    :value="value"
    :BlocksIndex="BlocksIndex"
    :placeholder="placeholder"
    fontSize="20px"
  ></Heading>
</template>

<script>
import Heading from "@/components/basicBlockComponents/Heading";

export default {
  name: "Heading3",
  props: ["value", "BlocksIndex"],
  components: {
    Heading,
  },
  data() {
    return {
      placeholder: "标题2",
    };
  },
};
</script>