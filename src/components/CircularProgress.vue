<template>
  <div v-if="val.length == 0" class="absolute absolute-center">
    <q-circular-progress
      indeterminate
      size="50px"
      :thickness="0.2"
      color="green"
      track-color="transparent"
      class="q-ma-md"
    />
  </div>
</template>

<script>
export default {
  props: {
    val : {
      type: Array,
    }
  }
}
</script>

<style>

</style>
