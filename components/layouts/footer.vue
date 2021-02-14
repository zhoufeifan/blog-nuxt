<template>
  <footer :class="{'mobile': mobileLayout}" class="">
    <div class="container">
      <p class="icp">
        <time>©{{new Date().getFullYear()}}</time>
        <span class="hr"></span>
        <a href="mailto:superzhou7@gmail.com" _target="_blank">邮箱</a>
        <span class="hr"></span>
        <a href="https://github.com/zhoufeifan" _target="_blank">GitHub</a>
      </p>
    </div>
  </footer>
</template>
<script>

export default {
  name: 'Mfooter',

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    option () {
      return this.$store.state.options.option
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    friends () {
      return this.$store.state.link.data.list
    }
  }
}

</script>

<style scoped lang="scss">

footer {
  margin-top: $normal-pad;
  padding: $normal-pad 0;
  background: $white;
  border-top: 1px solid $border-color;
  color: $text;

  >.container {
    display: flex;
    justify-content: flex-end;

    &.center {
      justify-content: center;
    }

    > ul,
    > .mune {
      padding: $normal-pad / 2 0;
    }

    > .mune {
      padding: $normal-pad / 2 $normal-pad;
      border-top: 1px solid $border-color;
    }
  }

  &.mobile {
    display: none;
    margin-top: 0;
    padding: 0 1rem;

    >.container {
      width: 100%;
    }
  }
}
</style>

