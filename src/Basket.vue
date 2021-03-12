<template>
  <div>
    Menu: 
    <ul>
      <li v-for="item in basketList" v-bind:key="item.name">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <button v-on:click="clickShow(); sendOrder()">Send Order</button>
    <div v-show="toShow">
      <p> Sub Total: ${{ this.subTotal }} </p>
      <p> Grand Total: ${{ this.grandTotal }} </p>
    </div>
  </div>
</template>

<script>
import database from './firebase.js'

export default {
  name: "Basket",
  props: {
    basketList: {
      type: Array
    }
  },
  data() {
    return {
      subTotal: 0,
      grandTotal: 0,
      toShow: false
    }
  }, 
  methods: {
    clickShow: function() {
      this.toShow = true;
    },
    sendOrder: function() {
      let docRef = database.collection('orders').doc();
      docRef.set({name: "order"});
      for (let i = 0; i < this.basketList.length; i++) {
        const curr_item = this.basketList[i];
        docRef.collection('order').add({
          name: curr_item[0],
          count: curr_item[1],
          price: curr_item[2]
        }).then(() => location.reload());
      }
    }
  },
  computed: {
    findTotal: function() {
      var subPrice = 0;
      for (let i = 0; i < this.basketList.length; i++) {
        const curr_item = this.basketList[i];
        const quantityBought = curr_item[1];
        const item_price = curr_item[2];
        subPrice += quantityBought * item_price;
      }
      return subPrice;
    }
  },
  watch: {
    findTotal: function() {
      this.subTotal = this.findTotal;
      this.grandTotal = this.findTotal * 1.07;
      this.grandTotal = this.grandTotal.toFixed(2);
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
  display: inline-block;
  height: 40px;
  width: 150px;
  border-radius: 4px;
  background-color: #ffc559;
  cursor: pointer
}
</style>