<template>
  <div class="start">
    <p class="start__title">SHAREをはじめる</p>
    <div class="start__links">
      <nuxt-link to="/register">
        <button class="start__btn">新規登録</button> 
      </nuxt-link>
      <nuxt-link to="/login">
        <button class="start__btn">ログイン</button>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
  .start {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      margin-bottom: 50px;
      font-size: 2em;
    }

    &__btn {
      cursor: pointer;
      color: #fff;
      background-color: #6008F5;
      padding: 8px 20px;
      border: none;
      border-radius: 20px;
      transition: 0.1s;
      transform: scale(1);
      &:active {
        transform: scale(0.98);
      }
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
    }
  }
</style>