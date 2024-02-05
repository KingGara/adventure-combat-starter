const {Character} = require('./character');

// Class extending character
class Enemy extends Character {
  constructor(name, description, currentRoom) { // parameter signature
    super(name, description, currentRoom) // Calling constructor from parent class?
    this.cooldown = 3000
    this.attackTarget = null; // Class properties
  }

  // Creating or setting? a new player
  setPlayer(player) {
    this.player = player;
  }


  // randomMove() {
  //   if (this.cooldown > 0) {
  //     this.rest();
  //   } else {
  //     const exits = this.currentRoom.getExits();
  //     const exitsLength = exits.length;
  //     const randomNum = Math.floor(Math.random() * exitsLength);
  //     const dir = exits[randomNum]
  //     const room = this.currentRoom.getRoomInDirection(dir);
  //     this.currentRoom = room;
  //     this.cooldown = 3000;
  //   }
  // }

  randomMove() {
    const exits = this.currentRoom.getExits(); // Sets exits to current rooms exits keys
    const exitsLength = exits.length; // sets variable to length of exits. 
    const randomNum = Math.floor(Math.random() * exitsLength); // sets variable to a rndm nm within range of exitslength.
    const dir = exits[randomNum] // Sets dir to a rdm exit key.
    const room = this.currentRoom.getRoomInDirection(dir); // Sets room to a dir(rdm exit)
    this.currentRoom = room; // Sets currentRoom to room
    this.cooldown = 3000; // Sets CD to 3 sec
  }

  // takeSandwich() {
  //   const item = this.currentRoom.getItemByName(sandwich);
  //   const itemIndex = this.currentRoom.items.indexOf(item)
  //   if (itemIndex !== -1) {
  //     this.currentRoom.items.splice(itemIndex, 1) 
  //   } else {
  //     console.log("No sandwich in this room.")
  //   }
  // }

  takeSandwich() {
    const itemIndex = this.currentRoom.items.findIndex(item => item.name === 'sandwich'); // Sets variable to the first index in array that matches parameter. 
    if (itemIndex !== -1) { // Conditional check if true
      this.currentRoom.items.splice(itemIndex, 1); // Removes sandwich from room
      console.log(`Took Sandwich`);
    } else {
      console.log(`No sandwich in Room`)
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) { // I dont really understand how we are able to refernce .player here
    // when were in the enemy class. Is it because of the setPlayer method above?
    if (this.player && this.player.currentRoom === this.currentRoom) {
      // Check if player 
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
    // const reset = resetCooldown.bind(this);
    // setTimeout(reset, this.cooldown);
  }

  attack() {
    if (this.cooldown > 0) {
      this.rest();
    } else {
      if (this.attackTarget) {
        this.attackTarget.health -= this.strength;
        this.cooldown = 3000;
      }
    }
  }

  applyDamage(amount) {
    // Fill this in
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 6000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
