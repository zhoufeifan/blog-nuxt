<template>
  <article class="article-container">
    <div class="article-header">
      <p class="title">{{article.title}}</p>
      <span>{{article.createAt}}</span>
    </div>
    <img class="article-img" v-if="article.img" :src="article.img" :alt="article.alt" />
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content(params.slug).fetch();
    // const tagsList = await $content('tags')
    //   .only(['name', 'slug'])
    //   .where({ name: { $containsAny: article.tags } })
    //   .fetch()
    // const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
    // const [prev, next] = await $content('articles')
    //   .only(['title', 'slug'])
    //   .sortBy('createdAt', 'asc')
    //   .surround(params.slug)
    //   .fetch()
    return {
      article,
      // tags,
      // prev,
      // next
    }
  },
}
</script>

<style lang="scss">
.article-container {
  .article-header {
    margin-bottom: 30px;
  }
  .title {
    font-size: 2rem;
    color: var(--theme-black);
  }
  .article-img {
    width: 660px;
    height: 330px;
    object-fit: cover;
    margin-bottom: 30px;
  }
  .nuxt-content {
    h1,h2,h3,h4,h5 {
      &>a {
        display: none;
      }
    }
    img {
      width: 100%;
    }
    p {
      margin-bottom: 20px;
    }
    h2 {
      font-weight: bold;
      font-size: 28px;
      margin-bottom: 10px;
    }
    h3 {
      font-weight: bold;
      font-size: 22px;
    }
  }
  .icon.icon-link {
    /* background-image: url('~assets/svg/icon-hashtag.svg'); */
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
  }
}

</style>
