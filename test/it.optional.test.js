it.optional = require('../it.optional');
var assert = require('assert');

describe('optional tests', function(){
  
  describe('async', function(){
  
    it.optional('should do xyz', function(done){
      done();
    });
    
    it.optional('should do xyz eventually', function(done){
      done(new Error('oops'));
    });
    
    it.optional('should do ikj eventually', function(done){
      throw new Error('uncaught error');
    });
    
    it.optional('should do abc eventually', function(done){
      setTimeout(function(){
        assert.equal('a', 'b');
      }, 100);
    });
  
  });
  
  describe('sync', function(){
  
    it.optional('should do xyz', function(){});
    
    it.optional('should do xyz eventually', function(){
      throw new Error('oops');
    });
    
    it.optional('should do abc eventually', function(){
      assert.equal(1, 2);
    });
  
  });

});