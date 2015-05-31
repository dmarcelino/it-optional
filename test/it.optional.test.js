it.optional = require('../it.optional');
var assert = require('assert');

describe('optional tests', function(){
  
  var asyncTestsDone, syncTestsDone;
  
  describe('async', function(){
    
    after(function(){
      asyncTestsDone = true;
    });
  
    it.optional('should do xyz', function(done){
      done();
    });
    
    it.optional('should do xyz eventually', function(done){
      done(new Error('oops'));
    });
    
    it.optional('should do mno eventually', function(done){
      setTimeout(function(){
        done(new Error('oops'));
      }, 5);
    });
    
    it.optional('should do ikj eventually', function(done){
      throw new Error('uncaught error');
    });
    
    it.optional('should do abc eventually', function(done){
      setTimeout(function(){
        assert.equal('a', 'b');
      }, 5);
    });
    
    it.optional('should never be done', function(done){
    });
    
    it.optional('should never be done in 50ms', function(done){
      this.timeout(50);
    });
  
  });
  
  describe('sync', function(){
    
    after(function(){
      syncTestsDone = true;
    });
  
    it.optional('should do xyz', function(){});
    
    it.optional('should do xyz eventually', function(){
      throw new Error('oops');
    });
    
    it.optional('should do abc eventually', function(){
      assert.equal(1, 2);
    });
  
  });
  
  describe('optional count', function(){
    
    // Polls `someCondition` every 50ms
    function allTestsDone(done) {
      if (asyncTestsDone && syncTestsDone) done();
      else setTimeout( function(){ allTestsDone(done) }, 50 );
    }
    
    before(function( done ){
      allTestsDone( done );
    });
    
    it('should be 8', function(){
      assert.equal(it.optional.count, 8);
    });

  });

});