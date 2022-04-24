<template>
  <div class="container">
    <EntranceHeader/>
    <EntranceForm :name-required="false" @clicked="logIn($event)">
      <div slot="title">ログイン</div>
      <div slot="button">ログイン</div>
    </EntranceForm>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    methods: {
        async logIn(data) {
            if (!data.email || !data.password) {
                alert("すべての項目を入力してください");
            }
            else {
                try {
                    const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
                    const uid = response.user.uid;
                    this.$router.push({ path: `home/${uid}` });
                }
                catch (error) {
                }
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