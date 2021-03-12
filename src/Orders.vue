<template>
  <div>
    <!--Tab Links-->
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <!--Orders-->
    <ul>
      <li v-for="order in orders" v-bind:key="order.name">
        <dl>
          <dt v-for="item in order[1]" v-bind:key="item.name">
            {{ item.name }}: {{ item.count }}
          </dt>
        </dl>
        <button v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
        <button v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from './firebase.js'
export default {
  name: "Orders",
  data() {
    return {
      orders: []
    };
  },
  methods: {
    fetchItems: function() {
      database.collection('orders').get().then(snapshot => {
        snapshot.forEach(doc => {
          var order = [];
          var documentID = doc.id;
          database.collection('orders').doc(documentID).collection('order').get().then(snapshot2 => {
            snapshot2.forEach(doc2 => {
              order.push(doc2.data());
            })
          })
          this.orders.push([documentID, order]);
        })
      })
    },
    deleteItem: function(event) {
      let doc_id = event.target.getAttribute("id");
      database.collection('orders').doc(doc_id).collection('order').get().then((snapshot) => {
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
      database.collection('orders').doc(doc_id).delete().then(() => location.reload());
    },
    route: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: 'Modify', params: { id: doc_id } });
    }
  },
  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>