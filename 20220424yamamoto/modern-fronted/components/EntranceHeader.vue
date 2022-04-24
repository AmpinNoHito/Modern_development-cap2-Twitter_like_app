<template>
  <div class="header">
    <div class="header__logo">
      <img src="~/assets/image/logo.png" alt="ロゴ">
    </div>
    <div class="header__links">
      <nuxt-link class="header__link" to="/register">新規登録</nuxt-link>
      <nuxt-link class="header__link" to="/login">ログイン</nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    height: 100%;
    padding: 12px 20px;
  }

  &__logo > img {
    height: 100%;
  }

  &__link {
    margin-right: 20px;
    font-size: 14px;
  }
}

</style>