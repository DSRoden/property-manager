'use strict';



function Renter(name, age, gender, profession) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.profession = profession;
  this.party = 0;
  this.cash = Math.floor(Math.random() * 401) + 100;
  this.isEvicted = false;
}

Renter.prototype.work = function (){
  switch(this.profession){
    case 'Slumlord':
      this.cash = this.cash + Math.floor(Math.random() * 5001) + 2000;
      break;

    case 'Dealer':
      this.cash = this.cash + Math.floor(Math.random() * 3001) + 1000;
      break;
      
    case 'Teacher':
      this.cash = this.cash + Math.floor(Math.random() * 1001) + 700;
      break;

    case 'Clerk':
      this.cash = this.cash + Math.floor(Math.random() * 701) + 200;
  }
  
};

Renter.prototype.rent = function(amount) {
    this.cash =  this.cash - amount;
    if(this.cash <= 0){
      this.isEvicted = true;
    } else {
      this.isEvicted = false;
    }
};

Renter.prototype.partyness = function(){
      this.party = Math.floor(Math.random() * 10) + 1;
      if (this.party > 8){
      this.isEvicted = true;
      }
      else {
      this.isEvicted = false;
      }
};



module.exports = Renter;
