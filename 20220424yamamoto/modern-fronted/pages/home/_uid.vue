<template>
  <div class="home">
    <Sidebar
      :pass-to-home="`../home/${currentUserUid}`"
      :pass-to-login="'/login'"
      @clicked="insertPost($event)">
      {{currentUserName}}
    </Sidebar>
    <!-- ユーザー名、新規投稿フォーム -->
    <div class="home__main">
      <div class="home__top">ホーム</div>
      <div class="post-wrapper">
        <div v-for="(post, index) in reversePostList" :key="post.id">
          <div class="post">
            <div class="post__upper">
              <span class="post__poster">
                {{postedBy(post.user_id)}}
              </span>
              <span class="post__like">
                <span 
                  class="post__heart"
                  :class="[
                    `post__heart--${post.id}`, 
                    {'post__heart--red': likedPostId.indexOf(post.id) !== -1}
                    ]"
                  @click="
                    toggleLike(currentUserId, post.id); 
                    countLikes(post.id);
                    toggleRed(post.id)
                    ">
                  <img src="~/assets/image/heart.png" alt="♥">
                </span>
                {{countLikes(post.id)}}
              </span>
              <span
                class="post__delete" 
                @click="deletePost(post.id)"
                v-if="currentUserId === post.user_id">
                <img src="~/assets/image/cross.png" alt="×">
              </span>
              <nuxt-link 
                class="post__comment-btn" :to="{path: `/comment/${currentUserUid}/${post.id}`}">
                <img src="~/assets/image/detail.png" alt="detail">
              </nuxt-link>
            </div>
            <div class="post__content">
              <p>{{post.content}}</p>
            </div>
            <div class="post__comment" v-if="checkCommentExistence(post.id)">
              <div class="post__boundary">
                コメント
              </div>
              <div v-for="(comment, index) in showComments(post.id)" :key="comment.id">
                <p class="post__comment-commenter">
                  {{postedBy(comment.user_id)}}
                  <span
                  class="post__delete" 
                  @click="deleteComment(comment.id)"
                  v-if="currentUserId === comment.user_id">
                  ×
                  </span>
                </p>
                <p class="post__comment-content">{{comment.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import auth from "~/middleware/auth";
export default {
  middleware: [auth],
  data() {
    return {
      currentUserUid: this.$route.params.uid,
      currentUserId: '',
      currentUserName: '',
      userList: [],
      postList: [],
      likedPostId: [],
      commentList: [],
      likeList: [],
    };
  },
  computed: {
    reversePostList() {
      return this.postList.slice().reverse();
    },
  },
  methods: {
    async insertPost(newPost) {
      const sendData = {
        user_id: this.currentUserId,
        content: newPost,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/post", sendData);
      await this.getPosts();
      this.newPost = null;
    },
  },
  async mounted() {
    await this.getUsers();
    await this.getUserInfo(this.currentUserUid);
    await this.getPosts();
    await this.getComments();
    await this.getLikes();
    await this.getLikedPostId();
  },
};


</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: space-between;
  
  &__main {
    width: 100%;
  }

  &__top {
    font-weight: bold;
    padding: 20px 10px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
}

.post {
  padding: 10px 0;
  border: 1px solid #fff;
  
  &__upper {
    display: flex;
    align-items: center;
    height: 20px;
    padding: 0 20px;
    margin-bottom: 20px;
    margin-right: 10px;
    & > span {
      margin-right: 10px;
      &:last-of-type {
        margin-right: 20px;
      }
    }
  }
  
  &__poster {
    font-weight: bold;
    font-size: 1.2em;
  }

  &__like, 
  &__delete,
  &__comment-btn {
    cursor: pointer;
    display: inline-block;
    height: 100%;
    & > img {
    height: 100%;
    display: inline-block;
  }
  }

  &__heart {
    vertical-align: middle;
    & > img {
    height: 100%;
    display: inline-block;
    }
    &--red > img {
    filter: opacity(0.4) drop-shadow(0 0 0 red);
    } 
  }

  &__content {
    padding: 10px 20px;
  }

  &__comment-commenter {
    text-indent: 1em;
    padding-top: 5px;
    font-weight: bold;
  }

  &__comment-content {
    text-indent: 2em;
    padding-top: 3px;
    padding-bottom: 8px;
  }

  
  &__boundary {
    padding: 10px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.3) ;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) ;
  }
}
</style>