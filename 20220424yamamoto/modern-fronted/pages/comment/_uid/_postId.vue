<template>
  <div class="comment">
    <Sidebar
      :pass-to-home="`../../home/${currentUserUid}`"
      :pass-to-login="'../login'"
      @clicked="insertPost($event); 
                $router.push({path: `../../home/${currentUserUid}`})">
      {{currentUserName}}
    </Sidebar>
    <div class="comment__main">
      <div class="comment__top">ホーム</div>
      <div class="post-wrapper">
        <div class="post">
          <div class="post__upper">
            <span class="post__poster">
              {{currentPostPosterName}}
            </span>
            <span class="post__like">
              <span 
                class="post__heart"
                :class="[
                  `post__heart--${currentPostId}`, 
                  {'post__heart--red': likedPostId.indexOf(currentPostId) !== -1}
                  ]"
                @click="
                  toggleLike(currentUserId, currentPostId); 
                  countLikes(currentPostId);
                  toggleRed(currentPostId)
                  ">
                
                <img src="~/assets/image/heart.png" alt="♥">
              </span>
              {{countLikes(currentPostId)}}
            </span>
            <span
              class="post__delete" 
              @click="deletePost(currentPostId); 
                      $router.push({path: `../../home/${currentUserUid}`})"
              v-if="currentUserId === currentPostPosterId">
              <img src="~/assets/image/cross.png" alt="×">
            </span>
            <nuxt-link 
              class="post__comment-btn" :to="{path: `/comment/${currentUserUid}/${currentPostId}`}">
              <img src="~/assets/image/detail.png" alt="detail">
            </nuxt-link>
          </div>
          <div class="post__content">
            {{currentPostContent}} 
          </div>
          <div 
            v-if="checkCommentExistence(currentPostId)"
            v-for="(comment, index) in showComments(currentPostId)" 
            :key="comment.id"
            >
            <div class="post__boundary">
              コメント
            </div>
            <div class="post__comment">
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
      <div class="new-comment">
        <validation-observer ref="obs" v-slot="ObserverProps" >
          <validation-provider v-slot="{errors}" rules="required|max:120">
            <input class="new-comment__input" v-model="newComment" type="text" name="コメント" autocomplete="off">
          </validation-provider>
          <div class="new-comment__btn-wrapper">
            <SubmitButton
              class="new-comment__btn"
              @clicked="insertComment"
              :disabled="ObserverProps.invalid||!ObserverProps.validated">
              コメント
            </SubmitButton>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import auth from "~/middleware/auth";
export default {
  middleware: [auth],
  data() {
    return {
      currentUserUid: this.$route.params.uid,
      currentUserId: '',
      currentUserName: '',
      currentPostId: +this.$route.params.postId,
      currentPostContent: null,
      currentPostPosterId: null,
      currentPostPosterName: null,
      newComment: null,
      userList: [],
      commentList: [],
      likeList: [],
      likedPostId: [],
    }
  },
  methods: {
    async getPostInfo() {
      const resData = await this.$axios.get(`http://127.0.0.1:8000/api/post/`);
      const postList = resData.data.data;
      const currentPost = postList.find(post => post.id === this.currentPostId);
      this.currentPostContent = currentPost.content;
      const currentPostPoster = this.userList.find(user => user.id === currentPost.user_id);
      this.currentPostPosterId = currentPostPoster.id;
      this.currentPostPosterName = currentPostPoster.name;
    },
    async insertPost(newPost) {
      const sendData = {
        user_id: this.currentUserId,
        content: newPost,
      };
      this.newPost = null;       
      await this.$axios.post("http://127.0.0.1:8000/api/post", sendData);  
    },
    async insertComment() {
      const sendData = {
        user_id: this.currentUserId,
        post_id: this.currentPostId,
        content: this.newComment,
      };
      await this.$axios.post('http://127.0.0.1:8000/api/comment', sendData);
      await this.getComments();
      this.newComment = '';
    },
  },
  async mounted() {
    await this.getUsers();
    await this.getUserInfo(this.currentUserUid);
    await this.getPostInfo();
    await this.getComments();
    await this.getLikes();
    await this.getLikedPostId();
  },
};
</script>

<style lang="scss">
.comment {
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

.new-comment {
  margin-top: 20px;
  border-top: 1px solid #000;

  &__input {
    color: #fff;
    font-family: inherit;
    font-size: inherit;
    border: 1px solid #fff;
    border-radius: 10px;
    background-color: inherit;
    resize: none;
    width: 90%;
    margin-left: 15px;
    padding: 5px;
  }

  &__btn-wrapper {
    margin-top: 15px;
    margin-right: 5%;
    text-align: right;
  }
  
  &__btn:disabled {
    filter: opacity(50%);
  }
}
</style>