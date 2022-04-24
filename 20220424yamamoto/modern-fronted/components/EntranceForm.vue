<template>
  <div class="entrance-form">
    <div class="entrance-form__container">
      <p class="entrance-form__title">
        <slot name="title"></slot>
      </p>
      <validation-observer 
        ref="obs"
        v-slot="ObserverProps"
        class="entrance-form__items-wrapper">
        <form>
          
          <validation-provider
            v-if="nameRequired" 
            v-slot="{errors}" 
            rules="required|max:20">
            <div class="entrance-form__item">
              <input
                class="entrance-form__input"
                v-model="sendData.userName"
                type="text" 
                name="ユーザーネーム"
                placeholder="ユーザーネーム"
                >
              <p v-show="errors[0]" class="entrance-form__error">※{{errors[0]}}</p>
            </div>
          </validation-provider>

          <validation-provider
            v-slot="{errors}"
            rules="required|email">
            <div class="entrance-form__item">
              <input
                class="entrance-form__input"
                v-model="sendData.email" 
                type="email"
                name="メールアドレス"
                placeholder="メールアドレス">
              <p v-show="errors[0]" class="entrance-form__error">※{{errors[0]}}</p>
            </div>
          </validation-provider>
          
          <validation-provider
            v-slot="{errors}"
            rules="required|min:6|alpha_dash">
            <div class="entrance-form__item">
              <input
                class="entrance-form__input"
                v-model="sendData.password"
                type="password"
                name="パスワード"
                placeholder="パスワード">
              <p v-show="errors[0]" class="entrance-form__error">※{{errors[0]}}</p>
            </div>
          </validation-provider>
          <div class="entrance-form__btn-wrapper">
            <SubmitButton 
              @clicked="clicked"
              :disabled="ObserverProps.invalid||!ObserverProps.validated"
            >
              <slot name="button"></slot>
            </SubmitButton>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sendData : {
          userName: '',
          email: '',
          password: '',
        }
      }
    },
    props: {
      nameRequired: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      clicked() {
        this.$emit('clicked', this.sendData);
      }
    },
  }
</script>

<style lang="scss">
.entrance-form {
  display: flex;
  justify-content: center;

  &__container {
    width: 40%;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #000;
    margin-top: 50px;
  }
  
  &__title {
    font-weight: bold;
    margin-bottom: 15px;
  }

  &__items-wrapper {
    width: 90%;
  }
  &__item {
    margin-bottom: 10px;
  }

  &__input {
    width: 100%;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    margin-bottom: 3px;
  }

  &__error {
    color: red;
    font-size: 0.6em;
    font-weight: bold;
  }

  &__btn-wrapper {
    text-align: center;
  }
}
</style>