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
    
    var timer;
    var skipped = false;
    function skipTest(cb){
      if(skipped){
        return;
      }
      skipped = true;
      clearTimeout(timer);
      self.test.title = titlePending;
      TestOptional.count++;
      cb();
    }
    
    // Increases the test default timeout and add a timeout of our own
    var testTimeout = self.__proto__.timeout;
    var resetTimer = function resetTimer(ms){
      ms = ms || self.runnable()._timeout || 2000;
      if (timer) { clearTimeout(timer); };
      timer = setTimeout(function(){
        titlePending = titlePending + ' (timeout)';
        skipTest(done);
      }, ms);
      testTimeout.call(self, ms + 50);
    };
    self.timeout = function newTimeout(ms){
      resetTimer(ms);
    };
    resetTimer();
    
    function processResult(result) {
      if (result) {
        self.skip();
      } else {
        clearTimeout(timer);
        done(); 
      }
    };
    
    function executeTest(){
      if (fn.length === 0) {
        processResult(fn());
      } else {
        fn.call(self, processResult);
      }
    }
    
    function handleErrorAsync(e){
      // async skip not supported yet: https://github.com/mochajs/mocha/issues/1625
      // self.skip();
      skipTest(done);
    }
    
    try {
      tryasync(executeTest)
      .catch(handleErrorAsync);
    } catch(e){
      // sync'ed / same tick exception
      skipTest(self.skip.bind(this));
    }
    
  });
};
