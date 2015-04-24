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
  if (!fn) {
    fn = titlePending;
    titlePending = 'Pending: ' + title;
  }

  function processResult(result) {
    if (result) {
      it(titlePending);
    } else {
      it(title, function() {});
    }
  };

  try {
    if (fn.length === 0) {
      return processResult(fn());
    }
    fn(processResult);
  } catch (e) {
    it(titlePending);
  }
};
