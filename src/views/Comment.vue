  
<template>
  <div>
    <div v-if="isLoading || !comment">
      <b-loading :is-full-page="true" :active.sync="isLoading" />
    </div>
    <div v-else class="container mb-20 mt-20">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <section>
              <b-tabs v-model="activeTab">
                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="newspaper"></b-icon>
                    <span>Comment</span>
                  </template>
                  <b-field label="ID">
                    <b-input disabled v-model="comment._id" placeholder="ID"></b-input>
                  </b-field>
                  <b-field v-if="comment.article" label="Article">
                    <div class="buttons">
                      <b-button
                        @click="articleDetailClicked()"
                        type="is-primary"
                        outlined
                      >{{comment.article.articleType=='news'? comment.article.title :comment.article.description}}</b-button>
                    </div>
                  </b-field>
                  <b-field v-if="comment.author" label="Author">
                    <div class="buttons">
                      <b-button
                        @click="userDetailClicked(comment.author._id)"
                        type="is-primary"
                        outlined
                      >{{comment.author.displayName}}</b-button>
                    </div>
                  </b-field>
                  <b-field
                    :type="validateDescription!== '' ?'is-danger' : null"
                    :message="validateDescription"
                    label="Description"
                  >
                    <b-input
                      maxlength="200"
                      v-model="comment.description"
                      placeholder="Description"
                    ></b-input>
                  </b-field>
                  <b-field label="Date">
                    <b-input disabled v-model="createdAt" placeholder="Date"></b-input>
                  </b-field>
                  <div class="buttons end pt-10">
                    <b-button
                      @click="putComment()"
                      type="is-success"
                      icon-right="check"
                      :disabled="validateDescription !== ''"
                    >Save</b-button>
                    <b-button type="is-danger" @click="deleteComment()" icon-right="delete">Delete</b-button>
                  </div>
                </b-tab-item>

                <b-tab-item>
                  <template slot="header">
                    <b-icon icon="thumb-up"></b-icon>
                    <span>
                      Likes
                      <b-tag rounded>{{likes.length}}</b-tag>
                    </span>
                  </template>
                  <div class="card mt-20 pl-10 pr-10">
                    <b-table
                      :data="likes"
                      ref="table"
                      paginated
                      per-page="10"
                      aria-next-label="Next page"
                      aria-previous-label="Previous page"
                      aria-page-label="Page"
                      aria-current-label="Current page"
                    >
                      <template slot-scope="props">
                        <b-table-column field="id" label="ID" numeric width="10" centered>
                          <b-tag>{{ props.row._id }}</b-tag>
                        </b-table-column>
                        <b-table-column
                          width="500"
                          field="displayName"
                          label="Name"
                          sortable
                        >{{ props.row.displayName }}</b-table-column>
                        <b-table-column sortable field="role" label="Role">{{ props.row.role }}</b-table-column>
                        <b-table-column
                          sortable
                          field="createdAt"
                          label="Date"
                        >{{ new Date(props.row.createdAt).toLocaleDateString() }}</b-table-column>
                        <b-table-column sortable field="active" label="Status">
                          <b-tag
                            :class="activeTag(props.row.active)"
                          >{{props.row.active ? 'activated' : 'banned'}}</b-tag>
                        </b-table-column>
                        <b-table-column label="Detail">
                          <b-button @click="userDetailClicked(props.row._id)">
                            <span>
                              <b-icon icon="account-search" size="25"></b-icon>
                            </span>
                          </b-button>
                        </b-table-column>
                      </template>
                      <template slot="empty">
                        <section class="section">
                          <div class="content has-text-grey has-text-centered">
                            <p>
                              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                            </p>
                            <p>Nothing here.</p>
                          </div>
                        </section>
                      </template>
                    </b-table>
                  </div>
                </b-tab-item>
              </b-tabs>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newsService from "@/services/newservice";
import { convertTimestamptoDate } from "@/assets/javascript/date";
export default {
  data() {
    return {
      comment: null,
      activeTab: 0,
      isLoading: false,
      likes: []
    };
  },
  async mounted() {
    const commentId = this.$route.params.commentId;
    if (commentId !== undefined) {
      this.isLoading = true;
      await this.fetchComment();
      this.isLoading = false;
    } else {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    createdAt: {
      get() {
        return convertTimestamptoDate(this.comment.createdAt);
      },
      set(newVal) {}
    },
    validateDescription() {
      if (
        typeof this.comment.description !== "undefined" &&
        this.comment.description.length <= 0
      )
        return "Description must be more than 0 chars long";
      else return "";
    }
  },
  methods: {
    async deleteComment() {
      this.isLoading = true;
      await newsService.deleteComment(this.comment._id);
      this.isLoading = false;
      this.$router.push({ name: "News" });
    },
    async fetchComment() {
      const commentId = this.$route.params.commentId;
      const comment = await newsService.getComment(commentId);
      this.comment = comment.data;
      const likes = await newsService.getCommentLikes(commentId);
      this.likes = likes.data;
    },
    activeTag(isActive) {
      if (isActive) return "is-success";
      else return "is-danger";
    },
    userDetailClicked(id) {
      this.$router.push({ name: "User", params: { userId: id } });
    },
    articleDetailClicked() {
      if (this.comment.article.articleType === "news")
        this.$router.push({
          name: "NewsDetail",
          params: { newsId: this.comment.article._id }
        });
      else if (this.comment.article.articleType === "community")
        this.$router.push({
          name: "Community",
          params: { newsId: this.comment.article._id }
        });
    },
    async putComment() {
      if (this.validateDescription === "") {
        const { description, _id } = this.comment;
        this.isLoading = true;
        console.log(_id);
        await newsService.putComment(
          {
            description
          },
          _id
        );
        this.isLoading = false;
      }
    }
  }
};
</script>