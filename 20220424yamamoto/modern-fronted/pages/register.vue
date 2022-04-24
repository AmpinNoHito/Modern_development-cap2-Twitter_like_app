<template>
  <div class="container">
    <EntranceHeader/>
    <EntranceForm @clicked="signUp($event)">
      <div slot="title">新規登録</div>
      <div slot="button">新規登録</div>
    </EntranceForm>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
      return {
        uid: "",
      };
  },
  methods: {
    async signUp(data) {
      if (!data.userName || !data.email && !data.password) {
          alert("すべての項目を入力してください。");
      }
      else {
        try {
          const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
          const newUser = response.user;
          newUser.updateProfile({ displayName: data.userName });
          this.uid = newUser.uid;
          this.insertUser(data, newUser);
        }
        catch (error) {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が不正です。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/invalid-email":
              alert("メールアドレスの形式が不正です。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              break;
            default:
              alert("エラーが発生しました。しばらくしてから再度お試しください。");
              break;
          }
        }
      }
    },
    async insertUser(data, newUser) {
      const sendData = {
        uid: this.uid,
        name: data.userName,
        email: data.email,
        password: data.password,
      };
      try {
        await this.$axios.post("http://127.0.0.1:8000/api/user", sendData);
        this.$router.push({ path: "/login" });
      }
      catch (error) {
        alert("エラーが発生しました。しばらくしてから再度お試しください。");
        newUser.delete();
      }
    },
  },
  mounted() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
  },
}
</script>

<style>
</style>