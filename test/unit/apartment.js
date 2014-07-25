/* jshint expr:true */
/*global describe, it, before, beforeEach*/
'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Room = require('../../app/models/room.js');
var Renter = require('../../app/models/renter.js');
var Apartment;

describe('Apartment', function(){
  before(function(done){
    connect('Property-Manager-Test', function(){
      Apartment = require('../../app/models/apartment.js');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('apartments').remove(function(){
      done();
    });
  });

// Constructor  //

  describe('constructor', function(){
  it('should create an apatment', function(){
  var a1 = new Apartment('unit');
  expect(a1).to.be.instanceof(Apartment);
  expect(a1.unit).to.equal('unit');
  expect(a1.rooms).to.have.length(0);
  expect(a1.renters).to.have.length(0);
  });
 });

// Synchronous Functions //

 describe('#area', function(){
  it('should find the area of the apartment', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
   var room3 = new Room('bedroom', '10', '10');

   a1.rooms = [room1, room2, room3];
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
   expect(a1.isAvailable()).to.be.true;
  });
 });

 describe('#isAvailable', function(){
  it('should find if there are rooms available', function() {
   var a1 = new Apartment('unit');
   var room1 = new Room('bedroom', '10', '10');
   var room2 = new Room('den', '10', '10');
    
   var renter1 = new Renter('Benny','32', 'Male', 'Slumlord');

   a1.rooms = [room1, room2];
   a1.renters = [renter1];
   expect(a1.isAvailable()).to.be.false;
  });
 });

 describe('#purgeEvicted', function(){
  it('should purge evicted renters/create a list of paying tenants', function(){
    var a1 = new Apartment('unit');
    var renter1 = new Renter('Benny', '32', 'Male', 'Slumlord');
    var renter2 = new Renter('Sarah', '32', 'Female', 'Dealer');
        renter1.cash = 100;
        renter2.cash = 600;
        renter1.rent(400);
        renter2.rent(400);
    a1.renters = [renter1, renter2];
    expect(a1.purgeEvicted()).to.have.length(1);
  });
 });

 describe('#collectRent', function(){
   it('should collect rent based on cost of an apartment and number of renters', function(){
     var a1 = new Apartment('unit');
     var room1 = new Room('bedroom', '10', '10');
     var room2 = new Room('den', '10', '10');
     var room3 = new Room('bedroom', '10', '10');
     
    var renter1 = new Renter('Benny', '32', 'Male', 'Slumlord');
    var renter2 = new Renter('Sarah', '32', 'Female', 'Dealer');
    
    a1.rooms =[room1, room2, room3];
    a1.renters =[renter1, renter2];
    expect(a1.collectRent()).to.equal(750);
   });
 });

// Asynchronous Functions //

 describe('#save', function(){
  it('Should save an apartment to mongodb', function(done) {
    var A1 = new Apartment('A1');
    A1.save(function() {
      expect(A1._id).to.be.instanceof(Mongo.ObjectID);
      done();
    });
  });
 });

 describe('find', function(){
  it('Should find all the items from mongodb', function(done) {
    var A1 = new Apartment('A1');
    A1.save(function(){
      Apartment.find({},function (apartments) {
        expect(apartments).to.have.length(1);
        done();
    });
  });
 });

  it('Should find an items in mongodb that match a query', function(done) {
    var A1 = new Apartment('A1');
    var A2 = new Apartment('A2');
    var A3 = new Apartment('A3');
    A1.save(function(){
      A2.save(function(){
        A3.save(function() {
          Apartment.find({unit : 'A1'}, function(apartments){
            expect(apartments).to.have.length(1);
            expect(apartments[0].unit).to.equal('A1');
            done();
          });
        });
      });
    });
   });
 });
  
// End Bracket //
});

