<template>
  <div class="container">
    <p class="text">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'img-text',
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
.text {
    min-width: 10%;
    max-width: 80%;
    min-height: 22px;
    display: inline-block;
    padding: 6px;
    margin: 10px auto;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--text-light-3);
    line-height: 1.2;
    @include centerBlock();
}
</style>
