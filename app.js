let budgetController = (function() {
  const num = 8;

  let chak = function(a) {
    return num + a;
  };
  return {
    publicTest: function(b) {
      console.log(chak(b));
    }
  };
})();

let UIController = (function() {
  return {};
})();

let controller = (function(budgetCtrl, UICtrl) {
  return {};
})(budgetController, UIController);
