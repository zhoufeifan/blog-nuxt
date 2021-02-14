<template>
  <div class="about" :class="{'mobile': mobileLayout}">
    <div class="title" >
      <span class="title-name">About me</span>
      <span class="line"></span>
    </div>
    <div class="info-box" :class="{'info-mobile': mobileLayout}">
      <div class="info ">
        <div class="list">
          <i class="iconfont icon-user"></i>
          <span class="list-content">序猿 周, <span >a 90s boy.</span></span>
        </div>
        <div class="list">
          <i class="iconfont icon-like"></i>
          <span class="list-content">Code, Read, and Exercise.</span>
        </div>
        <div class="list">
          <img src="/icons/sport.svg" width="16px"/>
          <!-- <i class="iconfont icon-music"></i> -->
          <span class="list-content">Run, Swim And Go Hinking.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-coffee"></i>
          <span class="list-content">Hello world!</span>
        </div>
        <!-- <div class="list">
          <i class="iconfont icon-comments"></i>
          <span class="list-content icons">
            <a href="https://github.com/jkchao" target="_blank"><i class="iconfont icon-github"></i></a>
            <a href="https://juejin.im/user/5858c896128fe1006b86cb51" target="_blank"><i class="iconfont icon-juejin"></i></a>
            <a href="https://weibo.com/5329847417/profile?rightmod=1&wvr=6&mod=personinfo" target="_blank"><i class="iconfont icon-weibo"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-twitter"></i></a>
            <a href="https://segmentfault.com/u/sanmao_58e1f28560e06" target="_blank"><i class="iconfont icon-sf"></i></a>
            <a href="mailto:jkchaom@gmail.com" target="_blank"><i class="iconfont icon-email"></i></a>
          </span>
        </div> -->
      </div>
      <div class="user-box">
        <div class="user">
          <img :src="user.gravatar" alt="" width="100%">
        </div>
      </div>
    </div>

    <p class="title more" :class="{'title-mobile': mobileLayout}">
      <span class="title-name">More</span>
      <span class="line"></span>
    </p>
    <div class="text-box ">
      <div class="text">
        <div class="left">
          <p>Too young too simple, sometimes a little native</p>
          <p>A little stupid, but always try hard</p>
          <p>Enjoy the present</p>
          <p>Always on the road</p>
          <p>Sometimes have some strange ideas, <br v-if="mobileLayout"/>maybe i will go to relize it</p>
          <!-- <p>All of me in the code and music</p> -->
        </div>
        <!-- <div class="right">
          <p>联系我</p>
          <img src="~/static/images/qrcode.jpg" alt="" width="120">
        </div> -->
      </div>
    </div>

    <p class="title more" :class="{'title-mobile': mobileLayout}">
      <span class="title-name">Following</span>
      <span class="line"></span>
    </p>
    <div class="friend">
      <a
        v-for="(friend,index) in friends"
        :key="index"
        :href="friend.url" target="_blank">
          {{ friend.name }}
      </a>
    </div>

    <!-- <appreciate
      :mobileLayout="mobileLayout"
      ></appreciate> -->


    <!-- <p class="title more">
      <span class="title-name">还有啥？</span>
      <span class="line"></span>
    </p>

    <div class="last">
      <p>你可以在下面申请友请链接，称呼 + 网址 。</p>
      <p>哦，对了，可以看看这篇文章
        <i><a href="https://jkchao.cn/article/5a03f6ec0a7b41779c672afa" target="_blank">来，喝酒吧！</a></i>这都是我乱说的。
      </p>
    </div> -->
  </div>
</template>

<script>


export default {

  name: 'about',

  transition: 'fade',

  head: {
    title: 'About'
  },

  data () {
    return {
      showBox:  false
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    friends () {
      return [
        {name: '阮一峰', url: 'http://www.ruanyifeng.com/blog/'},
        {name: '唐巧', url: 'http://blog.devtang.com/'},
        {name: '张鑫旭', url: 'https://www.zhangxinxu.com/wordpress/'},
        {name: '廖雪峰', url: 'https://www.liaoxuefeng.com/wiki/1022910821149312'},
        {name: '奇舞周刊', url: 'https://weekly.75.team/'},
      ]
      // return this.$store.state.link.data.list
    }
  },
}

</script>

<style lang="scss">

.about {
  width: $container-min-width;
  margin: 0 auto;

  .title {
    position: relative;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;
    }

    > .line {
      top: 50%;
    }
  }

  .title.more {
    margin-top: 2rem;
  }

  .title-mobile {
    margin-top: 0;
  }

  .last {
    padding: 2rem;
    border: 0;

    p {
      margin: .5rem 0;
    }

    a {
      text-decoration: underline;
    }
  }

  .friend {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 2rem 1rem 2rem;

    a {
      width: 30%;
      height: 3rem;
      margin-bottom: 1rem;
      margin-right: 5%;
      line-height: 3rem;
      text-align: center;
      background: $code-bg;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }



  .info-box {
    display: flex;
    justify-content: space-between;

    >.info {
      position: relative;
      width: calc(100% - 16rem - 1rem);
      padding: $normal-pad 0;

      >.list {
        display: flex;
        margin: .5rem;
        padding: 0 1.5rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
        }

        >.list-content {
          margin-left: 1rem;
        }


        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $text;
            @include transition(all .5s);

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }
      }
    }

    >.user-box {
      width: 16rem;
      padding-right: 2rem;

      .user {
        padding: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
          @include border-radius(4px);
        }
      }
    }
  }

  >.comment {
    margin-top: 2rem;
  }

  &.mobile {
    width: 100%;
    transform: translate(0);

    >.info-box {
      // grid-template-columns: 100%;
      width: 100%;
      flex-direction: column-reverse;

      >.info {
        padding: 1rem;
        width: 100%;

        >.list {
          padding: 0;
          // grid-gap: 1rem;
          @include text-overflow();

        }
      }
      >.user-box {
        // grid-row: 1 / 2;
        width: 100%;
        padding-right: 0;

        >.user {
          padding: 1.5rem;
        }
      }
    }
    .text-box .text {
      padding: 1.5rem;
      flex-wrap: wrap;
      text-align: left;

      .right {
        display: none;
      }
    }
  }

  >.text-box {
    margin-top: 1rem;

    >.text {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3rem 2rem;
      line-height: 2rem;

      .left {
        text-align: center;
      }

      .right {
        width: 12rem;
        text-align: center;

        p {
          margin-bottom: .5rem;
        }
      }
    }
  }
}

</style>
