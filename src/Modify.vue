<template>
  <div>
    <ul style="list-style-type:none">
      <li v-for="item in datapacket" v-bind:key="item.name">
        {{ item.name }}: {{ item.count }}
        <br>
        <input placeholder=0 type="number" :id=item.name min=0>
      </li>
    </ul>
    <button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from './firebase.js'

export default {
  name: "modify",
  data() {
    return {
      id: 0,
      datapacket: []
    };
  },
  methods: {
    fetchItems: function() {
      database.collection('orders').doc(this.id).collection('order').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.datapacket.push(doc.data());
        });
      });
    },
    updateOrder: function() {
      database.collection('orders').doc(this.id).collection('order').get().then(snapshot => {
        snapshot.forEach(doc => {
          var itemName = doc.data().name;
          var newCount = parseInt(document.getElementById(itemName).value);
          var docID = doc.id;
          database.collection('orders').doc(this.id).collection('order').doc(docID).update({
            count: newCount
          }).then(this.$router.push ({ name: "Orders" }))
        })
      } )
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchItems();
  }
}
</script>

<style scoped>
* {
  font-size: 20px;
  margin-bottom: 20px;
}
button {
  width: 200px;
  height: 60px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>