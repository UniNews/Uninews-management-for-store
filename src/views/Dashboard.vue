<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container pd-150">
        <PieChart :chartData="this.chartData" />
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"/>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import userservice from "@/services/userservice"
import PieChart from "@/components/charts/PieChart"
export default {
  name: "Dashboard",
  components: { 
    PieChart 
  },
  data() {
    return {
      articles:[],
      isLoading: false,
      chartData:null
    };
  },
  methods: {
    async fetchUsers () {
      this.isLoading = true
      const data = await userservice.getMyArticle(this.getUser()._id)
      this.articles = data.data.articles;
      let randomColor = []
      let lableData = []
      let viewsData = []
      this.articles.forEach(e => {
          lableData.push(e.title)
          viewsData.push(e.views.length)
          randomColor.push("#"+((1<<24)*Math.random()|0).toString(16))
        }
      )
      this.chartData = {
        labels: lableData,
        datasets: [
          {
            backgroundColor: randomColor,
            data: viewsData
          }
        ]
      }
      this.isLoading = false
    },
    ...mapGetters(
      {
        getUser:'Auth/getUser'
      }
    )
  },
  mounted() {
    this.fetchUsers()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pd-150 {
  padding: 150px;
}
</style>