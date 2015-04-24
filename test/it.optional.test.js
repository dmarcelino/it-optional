it.optional = require('../it.optional');

describe('optional tests', function(){
  
  it.optional('should do xyz', function(done){
    done();
  });
  
  it.optional('should do xyz eventually', function(done){
    done(new Error('oops'));
  });
  
  it.optional('should do xyz async eventually', function(done){
    throw new Error('uncaught error');
  }); 
  
  it.optional('should do xyz synced', function(){});
  
  it.optional('should do xyz synced eventually', function(){
    throw new Error('oops');
  });  

});