/* jshint expr:true */
/*global describe, it*/
'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apartment.js');
var Room = require('../../app/models/room.js');
var Renter = require('../../app/models/renter.js');

describe('Apartment', function(){
  describe('constructor', function(){
  it('should create an apatment', function(){
  var a1 = new Apartment('unit');
  expect(a1).to.be.instanceof(Apartment);
  expect(a1.unit).to.equal('unit');
  expect(a1.rooms).to.have.length(0);
  expect(a1.renters).to.have.length(0);
  });
 });

 describe('#area', function(){
  it('should find the area of the apartment', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
   var room3 = new Room('bedroom', '10', '10');

   a1.rooms = [room1, room2, room3];
   console.log(a1.rooms);
   expect(a1.totalArea()).to.equal(300);
  });
 });

 describe('#cost', function(){
  it('should find the cost of the apartment', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
   var room3 = new Room('bedroom', '10', '10');

   a1.rooms = [room1, room2, room3];
   console.log(a1.rooms);
   expect(a1.totalCost()).to.equal(1500);
  });
 });

 describe('#bedroom', function(){
  it('should find number of bedrooms in the apartment', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
   var room3 = new Room('bedroom', '10', '10');

   a1.rooms = [room1, room2, room3];
   console.log(a1.rooms);
   expect(a1.bedrooms()).to.equal(2);
  });
 });

 describe('#isAvailable', function(){
  it('should find if there are rooms available', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
   var room3 = new Room('bedroom', '10', '10');
    
   var renter1 = new Renter('Benny','32', 'Male', 'Ninja');

   a1.rooms = [room1, room2, room3];
   a1.renters = [renter1];
   console.log(a1.renters.length);
   console.log(a1.rooms.length);
   console.log(a1.bedrooms());
   expect(a1.isAvailable()).to.be.true;
  });
 });

 describe('#isAvailable', function(){
  it('should find if there are rooms available', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
    
   var renter1 = new Renter('Benny','32', 'Male', 'Ninja');

   a1.rooms = [room1, room2];
   a1.renters = [renter1];
   console.log(a1.renters.length);
   console.log(a1.rooms.length);
   console.log(a1.bedrooms());
   expect(a1.isAvailable()).to.be.false;
  });
 });
});

