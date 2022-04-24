<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="~/assets/image/logo.png" alt="ロゴ">
    </div>
    <p class="sidebar__item sidebar__item--user"><slot></slot></p>
    <nuxt-link :to="passToHome" class="sidebar__home">
      <p class="sidebar__item sidebar__item--home">
        ホーム
      </p>
    </nuxt-link>
    <nuxt-link :to="passToLogin" class="sidebar__logout">
      <p class="sidebar__item sidebar__item--logout">ログアウト</p>
    </nuxt-link>

    <div class="sidebar__post">
      <p class="sidebar__post-title">シェア</p>
      <br>
      <validation-observer ref="obs" v-slot="ObserverProps" >
        <validation-provider v-slot="{errors}" rules="required|max:120">
          <textarea 
            class="sidebar__post-input"
            v-model="newPost"
            name="投稿" 
            cols="30"
            rows="4"
          ></textarea>
        </validation-provider>
        <div class="sidebar__btn-wrapper">
          <SubmitButton
            class="sidebar__btn"
            @clicked="clicked"
            :disabled="ObserverProps.invalid||!ObserverProps.validated">
            シェアする
            </SubmitButton>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: '',
    };
  },
  props: [
    'passToHome',
    'passToLogin',
  ],
  methods: {
    clicked () {
      this.$emit('clicked', this.newPost);
      this.newPost = '';
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;

  &__logo {
    height: 50px;
    padding: 10px 0;
    margin-bottom: 10px;
  }

  &__logo > img {
    height: 100%;
  }

  &__item {
    cursor: pointer;
    margin-bottom: 20px;
    position: relative;
    margin-left: 35px;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -30px;
      transform: translateY(-50%);
      height: 20px;
      width: 20px;
    }
    &--user::before {
      background: url('~/assets/image/profile.png') center/cover;
    }
    &--home::before {
      background: url('~/assets/image/home.png') center/cover;
    }
    &--logout::before {
      background: url('~/assets/image/logout.png') center/cover;
    }
  }

  &__post {
    margin-top: 30px;
  }

  &__post-title {
    margin-bottom: 10px;
  }

  &__post-input {
    color: #fff;
    font-family: inherit;
    font-size: inherit;
    border: 1px solid #fff;
    border-radius: 10px;
    background-color: inherit;
    resize: none;
  }
  
  &__btn-wrapper {
    margin-top: 20px;
    text-align: right;
  }
  &__btn:disabled {
    filter: opacity(50%);
  }
}
</style>