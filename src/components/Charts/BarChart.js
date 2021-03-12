import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          label: "Total number",
          backgroundColor: [],
          data: []
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Number of each dish'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function() {
      // set label and color
      database.collection('menu').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          this.datacollection.labels.push(doc.data().name)
          this.datacollection.datasets[0].backgroundColor.push(doc.data().color)
          this.datacollection.datasets[0].data.push(0)
        })
      })
      // set data
      database.collection('orders').get().then(snapshot => {
        snapshot.forEach(doc => {
          var documentID = doc.id
          database.collection('orders').doc(documentID).collection('order').get().then(snapshot2 => {
            snapshot2.forEach(doc2 => {
              var itemName = doc2.data().name
              var qty = doc2.data().count
              var indexFromLabel = this.datacollection.labels.indexOf(itemName)
              var newQty = qty + this.datacollection.datasets[0].data[indexFromLabel]
              this.datacollection.datasets[0].data.splice(indexFromLabel, 1, newQty)
              this.renderChart(this.datacollection, this.options)
            })
          })
        })
      })
      
    }
  },
  created () {
    this.fetchItems()
  }
}
