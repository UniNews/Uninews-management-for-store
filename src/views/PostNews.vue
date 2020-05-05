<template>
  <section class="hero is-small">
    <b-loading :is-full-page="true" :active.sync="isLoading" />
    <div class="hero-body">
      <div class="container">
        <div class="b-shadow pd-18 bg-white">
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
          <div>
            <b-field
              label="Title"
              :type="this.titleError !== ''? 'is-danger' : null"
              :message="this.titleError"
            >
              <b-input v-model="title" maxlength="100"></b-input>
            </b-field>
          </div>
          <b-field label="NewsType">
            <b-select v-model="newsTypeValue" placeholder="Select an article-type" expanded>
              <option v-for="option in data" :value="option" :key="option">{{ option }}</option>
            </b-select>
          </b-field>
          <b-field class="file">
            <b-upload accept="image/*" v-model="file" @input="onImageSelected">
              <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Upload Image</span>
              </a>
            </b-upload>
            <div v-if="this.file">
              <span class="file-name">{{ this.file.name }}</span>
            </div>
            <span class="file-name tx-red" v-if="this.imageError !== ''">
              {{this.imageError}}
              <b-icon icon="alert-circle" type="is-danger" size="is-small"></b-icon>
            </span>
          </b-field>
          <b-field
            label="Description"
            :type="this.descriptionError !== ''? 'is-danger' : null"
            :message="this.descriptionError"
          >
            <b-input v-model="description" maxlength="1000" type="textarea" class="chat-area" />
          </b-field>
          <div>
            <b-button type="is-success" @click="postArticles()">Post</b-button>
          </div>
        </div>
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
      newsTypeValue: "club",
      data: ["club", "promotion", "lost-found", "university"],
      file: null,
      fileImageUrl: "",
      tags: [],
      description: "",
      title: "",
      isLoading: false,
      filteredTags: data,
      /* for validations */
      titleError: "",
      descriptionError: "",
      imageError: ""
    };
  },
  watch: {
    title: function(val) {
      if (val.length <= 0)
        this.titleError = "Title must be more than 0 chars long";
      else this.titleError = "";
    },
    description: function(val) {
      if (val.length <= 0)
        this.descriptionError = "Title must be more than 0 chars long";
      else this.descriptionError = "";
    },
    file: function(val) {
      if (!val) this.imageError = "Image must not be null";
      else this.imageError = "";
    }
  },
  methods: {
    async postArticles() {
      let error = false;
      if (this.title.length <= 0) {
        error = true;
        this.titleError = "Title must be more than 0 chars long";
      }
      if (this.description.length <= 0) {
        error = true;
        this.descriptionError = "Description must be more than 0 chars long";
      }
      if (!this.file) {
        error = true;
        this.imageError = "Image must not be null";
      }
      if (!error) {
        this.isLoading = true;
        await this.onImageUpload();
        const res = await newservice.postNews({
          articleType: "news",
          description: this.description,
          tags: this.tags,
          newsType: this.newsTypeValue,
          title: this.title,
          imageURL: this.fileImageUrl
        });
        this.isLoading = false;
        this.$router.push({
          name: "NewsDetail",
          params: { newsId: res.data._id }
        });
      }
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