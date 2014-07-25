/* jshint expr:true */
/*global describe, it*/
'use strict';

var expect = require('chai').expect;
var Renter = require('../../app/models/renter.js');

describe('Renter', function(){
  describe('constructor', function(){
    it('should create a new renter', function(){
    var renter1 = new Renter('Jerome', '44', 'Male', 'Slumlord');
    expect(renter1.name).to.equal('Jerome');
    expect(renter1.age).to.equal('44');
    expect(renter1.gender).to.equal('Male');
    expect(renter1.profession).to.equal('Slumlord');
    expect(renter1.cash).to.be.within(100, 500);
    expect(renter1.isEvicted).to.be.false;
  });
 });
    
  describe('#work', function(){
    it('should add cash to Renter', function(){
    var renter1 = new Renter('Jerome', '44', 'Male', 'Slumlord');
    renter1.work();
      expect(renter1.cash).to.be.within(2000, 7500);
    });
  });

  describe('#rent', function(){
    it('should subtract rent from cash', function(){
    var renter1 = new Renter('Jerome', '44', 'Male', 'Slumlord');
    renter1.work();
    renter1.rent(800);
      expect(renter1.cash).to.at.least(1);
      expect(renter1.isEvicted).to.be.false;
    
    });
    it('should subtract rent from cash', function(){
    var renter1 = new Renter('Jerome', '44', 'Male', 'Slumlord');
    renter1.work();
    renter1.rent(10000);
      expect(renter1.cash).to.be.below(0);
      expect(renter1.isEvicted).to.be.true;
  });
});

  describe('#party', function(){
    it('should rate the renter\'s party level', function (){
    var renter1 = new Renter('Jerome', '44', 'Male', 'Slumlord');
    renter1.partyness();
        expect(renter1.party).to.be.within(1,10);
        if (renter1.party > 8){
        expect(renter1.isEvicted).to.be.true;
        }
        if (renter1.party < 8){
          expect(renter1.isEvicted).to.be.false;
        }
     });
  });

 /* describe('#evict', function(){
    it('should evict renters with isEvict = true', function(){
    var renter1 = new Renter('Jerome', '44', 'Male', 'Slumlord');
      renter1.cash = 100;
      renter1.rent(400);
      expect(renter1.evict()).to.be.true;
    });
  });*/
});
