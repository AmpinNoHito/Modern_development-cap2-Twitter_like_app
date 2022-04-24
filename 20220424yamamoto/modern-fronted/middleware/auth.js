import firebase from 'firebase'
const auth = async ({route, redirect}) => {
  firebase.auth().onAuthStateChanged((response) => {
    if (!response) {
      return redirect('/login');
    } else if (route.params.uid !== response.uid) {
      redirect('/login');
    }
  });
}

export default auth;