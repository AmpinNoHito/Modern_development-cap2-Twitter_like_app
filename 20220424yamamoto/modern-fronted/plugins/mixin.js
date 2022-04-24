import Vue from 'vue';

Vue.mixin({
  methods: {
    /* users */
    async getUsers () {
      const resData = await this.$axios.get('http://127.0.0.1:8000/api/user');
      this.userList = resData.data.data;
    },
    async getUserInfo(key) {
      const resData = await this.$axios.get('http://127.0.0.1:8000/api/user');
      const userList = resData.data.data;
      const currentUser = userList.find(user => user.uid === key);
      this.currentUserId = currentUser.id;
      this.currentUserName = currentUser.name;
    },
    /* posts */
    async getPosts() {
      const resData = await this.$axios.get('http://127.0.0.1:8000/api/post');
      this.postList = resData.data.data;
    },
    postedBy(key) {
      const user = this.userList.find(user => user.id === key);
      return user.name;
    },
    async deletePost(id) {
      await this.$axios.delete(`http://127.0.0.1:8000/api/post/${id}`);
      this.getPosts();
    },
    /* comment */
    async getComments() {
      const resData = await this.$axios.get('http://127.0.0.1:8000/api/comment');
      this.commentList = resData.data.data;
    },
    checkCommentExistence(key) {
      const comments = this.showComments(key);
      return (comments.length) ? true : false;
    },
    showComments(key) {
      const comments = this.commentList.filter(comment => comment.post_id === key);
      return comments;
    },
    async deleteComment(id) {
      await this.$axios.delete(`http://127.0.0.1:8000/api/comment/${id}`);
      this.getComments();
    },
    /* like */
    async getLikes() {
      const resData = await this.$axios.get('http://127.0.0.1:8000/api/like');
      this.likeList = resData.data.data;
    },
    async toggleLike(userId, postId) {
      const ch = this.likeList.find(like => like.user_id === userId && like.post_id === postId);
      if (ch) {
        await this.$axios.delete(`http://127.0.0.1:8000/api/like/${ch.id}`);
      } else {
        const sendData = {
          user_id: this.currentUserId,
          post_id: postId,
        };
        await this.$axios.post('http://127.0.0.1:8000/api/like', sendData);
      }
      await this.getLikes();
    },
    countLikes(key){
      const likes = this.likeList.filter(like => like.post_id === key);
      return likes.length;
    },
    getLikedPostId() {
      const myLikes = this.likeList.filter(like => like.user_id === this.currentUserId);
      this.likedPostId = myLikes.map(myLike => myLike.post_id)
    },
    toggleRed(postId) {
      const heart = document.querySelector(`.post__heart--${postId}`);
      heart.classList.toggle(`post__heart--red`);
    }
  },
})