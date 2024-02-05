class Character { // Creating class

  constructor(name, description, currentRoom, strength = 10, health = 100) {
    // Parameter signature with some preset values
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom; // Setting class properties
    this.strength = strength;
    this.health = health;
    this.items = [];
  }
  
  // Instance method that applies dmg according to parameter
  applyDamage(amount) {
    this.health -= amount
    if (this.health <= 0) { // Check to see if dmg brings health to <= 0
      this.die() // If so calls die method
    }
  }

  // Instance method that kills player, drops items & sets items to empty
  die() {
    this.currentRoom.items.push(...this.items);
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};