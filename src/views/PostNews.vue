<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div class="b-shadow pd-18 bg-white">
          <div>
            <b-field label="ArticleType">
              <b-select v-model="selectedValue" placeholder="Select an article-type" expanded>
                <option value="news">News</option>
                <option value="community">Community</option>
              </b-select>
            </b-field>
            <b-field label="Tags">
              <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete
                icon="label"
                placeholder="Add a tag"
                maxtags="2"
                @typing="getFilteredTags"
              >
                <template slot-scope="props">
                  <strong>{{props.option}}</strong>
                </template>
                <template slot="empty">There are no items</template>
              </b-taginput>
            </b-field>
            <div v-show="selectedValue==='news'">
              <b-field v-if="title.length!==0" label="Title">
                <b-input v-model="title" maxlength="100" />
              </b-field>
              <b-field v-else label="Title"
                type="is-danger"
                message="title not be null">
                <b-input
                  v-model="title"
                  maxlength="100">
                </b-input>
              </b-field>
            </div>
            <b-field v-show="selectedValue==='news'" label="NewsType">
              <b-select v-model="newsTypeValue" placeholder="Select an article-type" expanded>
                <option v-for="option in data" :value="option" :key="option">{{ option }}</option>
              </b-select>
            </b-field>
            <b-field v-show="selectedValue==='news'" class="file">
              <b-upload v-model="file" @input="onImageSelected">
                <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Upload Image</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="file">{{ file.name }}</span>
              <span class="file-name tx-red" v-else>
                file not be null
                <b-icon
                icon="alert-circle"
                type="is-danger"
                size="is-small">
                </b-icon>
              </span>
            </b-field>
            <b-field v-if="description.length!==0" label="Description">
              <b-input v-model="description" maxlength="1000" type="textarea" class="chat-area" />
            </b-field>
            <b-field v-else label="Description"
              type="is-danger"
              message="description not be null">
              <b-input
                v-model="description"
                maxlength="1000">
              </b-input>
            </b-field>
            <div v-if="selectedValue==='news'">
              <b-button v-if="description.length===0 || title.length===0 || file===null" disabled>Post</b-button>
              <b-button v-else @click="postArticles()">Post</b-button>
            </div>
            <div v-else>
              <b-button v-if="description.length===0" disabled>Post</b-button>
              <b-button v-else @click="postArticles()">Post</b-button>
            </div>
          </div>
        </div>
        <b-loading :is-full-page="true" :active.sync="isLoading" />
      </div>
    </div>
  </section>
</template>

<script>
import newservice from "@/services/newservice";
const data = [
  "ทั่วไป",
  "ความรัก",
  "การเรียน",
  "กีฬา",
  "เตือนภัย",
  "รีวิว",
  "อาหาร"
];
export default {
  name: "PostNews",
  data() {
    return {
      selectedValue: "community",
      newsTypeValue: "club",
      data: ["club", "promotion", "lost-found", "university"],
      file: null,
      fileImageUrl: null,
      tags: [],
      description: "",
      title: "",
      isLoading: false,
      filteredTags: data
    };
  },
  methods: {
    postArticles() {
      var vm = this;
      this.isLoading = true;
      this.onImageUpload().then(() => {
        newservice.postNews({
          articleType: this.selectedValue,
          description: this.description,
          tags: this.tags,
          newsType: this.newsTypeValue,
          title: this.title,
          imageURL: this.fileImageUrl
        });
        vm.resetFooter();
        vm.isLoading = false;
      });
    },
    addToArray(value) {
      const index = this.tags.indexOf(value);
      if (index > -1) {
        this.tags.splice(index, 1);
      } else {
        this.tags.push(value);
      }
    },
    isSelected(value) {
      return this.tags.includes(value) ? "is-warning" : "is-primary";
    },
    onImageSelected(event) {
      this.file = event;
    },
    async onImageUpload() {
      if (this.file) {
        const formData = new FormData();
        formData.append("image", this.file);
        let result = await newservice.uploadNewsImage(formData);
        this.fileImageUrl = process.env.VUE_APP_API_URL + result.data.uri;
      }
    },
    resetFooter() {
      this.selectedValue = "community";
      this.newsTypeValue = "club";
      this.file = null;
      this.fileImageUrl = null;
      this.tags = [];
      this.description = "";
      this.title = "";
    },
    getFilteredTags(text) {
      this.filteredTags = data.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  }
};
</script>
<style scoped>
.bg-white {
  background: white;
}
.b-shadow {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.pd-18 {
  padding: 18px;
}
.tx-red {
  color: red;
}
</style>