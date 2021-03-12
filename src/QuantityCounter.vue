<template>
    <div>
        <button v-on:click="decrement()"> - </button>
        {{ counter }}
        <button v-on:click="increment()"> + </button>
    </div>
</template>

<script>
export default {
  name: "QuantityCounter",
  data() {
    return {
      counter: 0
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    increment: function() {
      if (this.counter < 10) {
        this.counter++;
      } else {
        alert("You cannot buy more than 10 items.")
      }
      this.$emit('counter', this.item, this.counter)
    }, 
    decrement: function() {
      if (this.counter > 0) {
        this.counter--;
      }
      this.$emit('counter', this.item, this.counter)
    }
  }
}
</script>

<style scoped>
div {
  font-size: 20px;
}
button {
  margin: 10px;
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 4px;
  background-color: #ffc559;
  cursor: pointer
}
</style>