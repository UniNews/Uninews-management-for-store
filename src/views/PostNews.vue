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
                @typing="getFilteredTags">
                <template slot-scope="props">
                    <strong>{{props.option}}</strong>
                </template>
                <template slot="empty">
                    There are no items
                </template>
              </b-taginput>
            </b-field>
            <b-field v-show="selectedValue==='news'" label="Title">
              <b-input v-model="title" maxlength="200"/>
            </b-field>
            <b-field v-show="selectedValue==='news'" label="NewsType">
              <b-select v-model="newsTypeValue" placeholder="Select an article-type" expanded>
                <option
                  v-for="option in data"
                  :value="option"
                  :key="option">
                  {{ option }}
                </option>
              </b-select>
            </b-field>
            <b-field v-show="selectedValue==='news'"   class="file">
              <b-upload v-model="file" @input="onImageSelected">
                  <a class="button is-primary">
                      <b-icon icon="upload"></b-icon>
                      <span>Upload Image</span>
                  </a>
              </b-upload>
              <span class="file-name" v-if="file">
                  {{ file.name }}
              </span>
            </b-field>
            <b-field label="Description">
              <b-input v-model="description" maxlength="200" type="textarea" class="chat-area" />
            </b-field>
            <b-button @click="postArticles()">Post</b-button>
          </div>
        </div>
        <b-loading :is-full-page="true" :active.sync="isLoading"/>
      </div>
    </div>
  </section>
</template>

<script>
import newservice from "@/services/newservice"
const data = ['ทั่วไป', 'ความรัก', 'การเรียน', 'กีฬา', 'เตือนภัย', 'รีวิว', 'อาหาร']
export default {
  name: "PostNews",
  data() {
    return {
      selectedValue:"community",
      newsTypeValue:null,
      data:['club', 'promotion', 'lost-found', 'university'],
      file:null,
      fileImageUrl: null,
      tags:[],
      description:'',
      title:'',
      isLoading:false,
      filteredTags: data
    }
  },
  methods:{
    postArticles() {
      var vm = this
      this.isLoading=true
      this.onImageUpload().then(()=> {
        newservice.postNews({ 
          articleType:this.selectedValue,
          description:this.description, 
          tags:this.tags, 
          newsType:this.newsTypeValue, 
          title:this.title, 
          imageURL: this.fileImageUrl 
        })
          vm.resetFooter();
          vm.isLoading=false
        }
      )
    },
    addToArray(value) {
      const index = this.tags.indexOf(value);
      if (index > -1) {
        this.tags.splice(index, 1);
      } else {
        this.tags.push(value)
      }
    },
    isSelected(value) {
      return this.tags.includes(value)? "is-warning" : "is-primary"
    },
    onImageSelected(event) {
      this.file = event;
    },
    async onImageUpload() {
      if(this.file) {
        const formData = new FormData();
        formData.append('image', this.file);
        let result = await newservice.uploadNewsImage(formData);
        this.fileImageUrl = process.env.VUE_APP_API_URL + result.data.uri;
      }
    },
    resetFooter() {
      this.selectedValue = "community";
      this.newsTypeValue = null;
      this.file = null;
      this.fileImageUrl = null;
      this.tags = [];
      this.description = '';
      this.title = '';
    },
    getFilteredTags(text) {
      this.filteredTags = data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
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
.mg-r-10 {
  margin-right: 10px;
}
.mg-r-10:nth-of-type(1) {
  margin-left: 20px;
}
</style>