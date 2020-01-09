//  BUDGET CONTROLLER
let budgetController = (function() {
  return {};
})();

//  UI CONTROLLER
let UIController = (function() {
  let DOMstrings = {
    inputBtn: ".add__btn",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputType: ".add__type"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMStrings: function() {
      return DOMstrings;
    }
  };
})();

//  GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDOMStrings();

  let setupEventListeners = function() {
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    const pressEnter = document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  ctrlAddItem = function() {
    //1.  Get the field input data
    UICtrl.getInput();
    console.log(UICtrl.getInput());
    //2.  Add the item to the budget controller
    //3.  Add the item to the UI
    //4.  Calculate the budget
    //5.  Display the budget on the UI
  };

  return {
    init: function() {
      console.log("Application has started.");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
