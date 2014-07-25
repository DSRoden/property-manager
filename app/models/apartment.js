'use strict';

var cApartments = global.mongodb.collection('apartments');
var _ = require('lodash');
var Room = require('./room');
var Renter = require('./renter');

function Apartment(unit) {

  this.unit = unit;
  this.rooms = [];
  this.renters = [];
}

Apartment.prototype.totalArea = function(){
  var sum = 0;
  for(var i = 0; i < this.rooms.length; i++){
  sum +=  this.rooms[i].area();
  }
  return sum;
};

Apartment.prototype.totalCost = function(){
  var sum = 0;
  for(var i = 0; i < this.rooms.length; i++){
  sum +=  this.rooms[i].cost();
  }
  return sum;
};

Apartment.prototype.bedrooms = function(){
  var count = [];
  for(var i = 0; i < this.rooms.length; i++){
    if(this.rooms[i].type === 'bedroom') {
    count.push(this.rooms[i]);
    }
  }
  return count.length;
};

Apartment.prototype.isAvailable = function(){

  if(this.bedrooms() > this.renters.length) {
    return true;
  } else { 
    return false;
  }
};

Apartment.prototype.purgeEvicted = function(){
    var tenents = [];
    for(var i=0; i < this.renters.length; i++){
     if (this.renters[i].isEvicted ===false){
     tenents.push(this.renters[i]);
     }
   }
    return tenents;
};

Apartment.prototype.collectRent = function(){
 return this.totalCost()/ this.renters.length;
};

// Asynchronous Instance  Functions //

Apartment.prototype.save = function(cb) {
  cApartments.save(this, function(err,obj){
    cb();
  });
};

// Asynchronous Class Functions //

Apartment.find = function(query, cb) {
  cApartments.find(query).toArray(function(err, apartments) {
   for(var i = 0; i <apartments.length; i++){
     apartments[i] = reProto(apartments[i]);
   }
    cb(apartments);

  });
};

Apartment.findById = function(query, cb) {
  cApartments.findOne(query, function(err, apartments){
     cb(reProto(apartments));
  });
};

Apartment.deleteById = function(id, cb) {
  cApartments.remove({_id : id}, function(){
     cb();
  });
};

Apartment.findArea = function(cb){
  Apartment.find({}, function(apartments){
  var sum = 0;
    for(var i = 0; i < apartments.length; i++){
    sum += apartments[i].totalArea();
  }
    cb(sum);
 });
};

Apartment.findCost = function(cb){
  Apartment.find({}, function(apartments){
  var sum = 0;
    for(var i = 0; i < apartments.length; i++){
    sum += apartments[i].totalCost();
  }
    cb(sum);
 });
};

Apartment.tenents = function(cb){
  Apartment.find({}, function(apartments){
  var numTenents = 0;
    for(var i = 0; i < apartments.length; i++){
    numTenents += apartments[i].renters.length;
    }
    cb(numTenents);
  });
};

Apartment.revenue = function(cb){
  Apartment.find({}, function(apartments){
    var sum = 0;
    for(var i = 0; i < apartments.length; i++){
    if (apartments[i].renters.length > 0){
      sum+= apartments[i].totalCost();
    }
    }
    cb(sum);
  });
};

//Helper Function from Adam //

function reProto(apt){
  var room, renter;
  for(var i= 0; i < apt.rooms.length;i++){
    room = _.create(Room.prototype, apt.rooms[i]);
    apt.rooms[i] = room;
  }
  for(var j = 0; j <apt.renters.length; j++){
    renter = _.create(Renter.prototype, apt.renters[j]);
    apt.renters[j] = renter;
  }
  apt = _.create(Apartment.prototype, apt);

  return apt;
}










module.exports = Apartment;
