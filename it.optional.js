/**
 * Dependencies
 */
 var tryasync = require('./tryasync');
 
/**
 * Expose `TestOptional`.
 */
exports = module.exports = TestOptional;


/**
 * Initialize a new `Test` with the given `title` and callback `fn`, if test 
 * would fail marks it as pending and uses `titlePending`
 *
 * @param {String} title
 * @param {String} titlePending
 * @param {Function} fn
 */
function TestOptional(title, titlePending, fn) {
  TestOptional.count = 0;
  
  if (!fn) {
    fn = titlePending;
    titlePending = 'PENDING: ' + title;
  }
  
  it(title, function(done){
    var self = this;
    
    function processResult(result) {
      if (result) {
        self.skip();
      }
      done();
    };
    
    function executeTest(){
      if (fn.length === 0) {
        processResult(fn());
      } else {
        fn.call(self, processResult);
      }
    }
    
    function handleErrorAsync(e){
      self.test.title = titlePending;
      TestOptional.count++;
      // async skip not supported yet: https://github.com/mochajs/mocha/issues/1625
      // self.skip();
      done();
    }
    
    try {
      tryasync(executeTest)
      .catch(handleErrorAsync);
    } catch(e){
      // sync'ed / same tick exception
      self.test.title = titlePending;
      TestOptional.count++;
      self.skip();
    }
    
  });
};
