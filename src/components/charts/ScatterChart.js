import { Scatter, mixins } from 'vue-chartjs'

export default {
  extends: Scatter,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData,{
      responsive: true,
      maintainAspectRatio: false
    })
  }
}