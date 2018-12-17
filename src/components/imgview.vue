<template>
  <div class="imgView" v-if="$store.state.srclive">
    <img :src="$store.state.srclive" alt="" @click.stop="showbig()">
  </div>
</template>
<script>

export default {
  name: 'imgview',
  data () {
    return {
      srclive:this.$store.state.srclive,
    }
  },
  methods: {
    showbig:function () {
      alert('bigImg');
    }
  },
  computed: {

  }
}
</script>

