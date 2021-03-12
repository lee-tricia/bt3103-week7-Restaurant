import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: []
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function () {
      var borderCols = ['#b5180d','#2394ad', '#293585', '#2a555e', '#685675', '#aae6a8']
      var index = 0
      // add dataset regions
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
      .then(response => {
        response.data.region_metadata.forEach(region => {
          this.datacollection.datasets.push({label: region.name, data:[], fill: false, borderColor: borderCols[index]})
          index += 1
        })
      })
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
      .then(response => {
        response.data.items.forEach(doc => {
          this.datacollection.labels.push(doc.timestamp)
          this.datacollection.datasets[0].data.push(doc.readings.psi_twenty_four_hourly.west)
          this.datacollection.datasets[1].data.push(doc.readings.psi_twenty_four_hourly.national)
          this.datacollection.datasets[2].data.push(doc.readings.psi_twenty_four_hourly.east)
          this.datacollection.datasets[3].data.push(doc.readings.psi_twenty_four_hourly.central)
          this.datacollection.datasets[4].data.push(doc.readings.psi_twenty_four_hourly.south)
          this.datacollection.datasets[5].data.push(doc.readings.psi_twenty_four_hourly.north)
          this.renderChart(this.datacollection, this.options)
        })
      })
    }
  },
  created () {
    this.fetchItems()
  }
}