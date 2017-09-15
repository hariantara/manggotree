"use strict"
var cron = require('node-cron');
var firebase = require('firebase')
var config = {
  apiKey: "AIzaSyByEHXkB_VmYuuVE3CdUsWXXU5kb90OCq4",
  authDomain: "mango-585ee.firebaseapp.com",
  databaseURL: "https://mango-585ee.firebaseio.com",
  projectId: "mango-585ee",
  storageBucket: "",
  messagingSenderId: "56291046204"
};
  firebase.initializeApp(config);
  var database = firebase.database()

// release 0

class FruitTree {

  // Initialize a new MangoTree
  constructor() {
  this.age = 0
  this.height = 0
  this.maxFruit = 0
  this.fruits = []
  this.healthyStatus = true
  }


  getAge() {
    return this.age
  }
  getHeight() {
    return this.height
  }
  getFruits() {
    return this.fruits
  }
  getHealtyStatus() {
    return this.healthyStatus
  }


  // Get current states here

  // Grow the tree
  grow() {
    this.age++
      let countHeight = Math.floor(Math.random()*(this.maxHeight*0,8))/10
    this.height += countHeight
    if(this.height >= this.maxHeight){
      this.height = this.maxHeight
    }
    this.height = parseFloat(this.height.toFixed(1))
    if (this.age >= this.maxAge) this.age = this.age;
    if(this.age == this.maxAge){
      this.healthyStatus = false
    }
  }

  // Produce some mangoes
  produceFruits(ageFruit) {
    let maxFruit = Math.floor(Math.random()*15)
    if(this.age >= ageFruit){
      for(let i = 0; i < maxFruit; i++){
        this.fruits[i] = new Fruit ()
      }
    }
    return maxFruit
    // console.log(maxFruit);
  }

  // Get some fruits
  harvest() {
    this.goodFruit = 0;
    this.badFruit = 0;
    for (let i = 0; i < this.fruits.length; i++) {
      if (this.fruits[i].quality === 'good') {
        this.goodFruit += 1;
      } else {
        this.badFruit += 1;
      }
    }
    this.harvested = `${this.fruits.length} (${this.goodFruit} good, ${this.badFruit} bad) `
    this.fruits = [];
  }

}

class Fruit {
  // Produce a mango
  constructor() {
    this.quality = this.quality()
  }

  quality(){
    let qlty = ['good', 'bad']
    return this.quality = qlty[Math.floor(Math.random()*2)];
    // console.log(this.quality);
  }

}


  class Mango extends Fruit {
  }

  class MangoTree extends FruitTree {
    constructor() {
      super();
      this.maxHeight = 8
      this.maxAge = 15;
    }
  }
    console.log('');
    console.log('MANGO TREE');
      //  driver code untuk release 0
    const mangoTree = new MangoTree();

    let grow = cron.schedule('*/3 * * * * *', function(){
      if (mangoTree.healthyStatus != false) {
        mangoTree.grow(7);
        mangoTree.produceFruits(5);
        mangoTree.harvest();
        database.ref('/mango').set({
        age: mangoTree.age,
        height: mangoTree.height,
        fruit: mangoTree.harvested})
        console.log(`[Year ${mangoTree.age} Report] Height = ${mangoTree.height} m | Fruits harvested = ${mangoTree.harvested}`)
      } else {
        grow.stop()
        console.log('Mango Tree is dead');
      }
});
