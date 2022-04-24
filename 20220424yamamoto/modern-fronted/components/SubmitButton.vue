<template>
  <button 
    class="btn"
    @click.prevent="clicked">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    clicked() {
      this.$emit('clicked');
    }
  },
};
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  color: #fff;
  background-color: 	#6008F5;
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  transition: 0.1s;
  transform: scale(1);
  &:not(:disabled):active {
    transform: scale(0.98);
  }
}
</style>