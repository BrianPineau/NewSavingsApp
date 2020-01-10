//  BUDGET CONTROLLER
let budgetController = (function() {
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals = {
      exp: 0,
      inc: 0
    }
  };
  

  return {
    addItem: function (type, des, value) {
      let newItem, ID;

      //  Create new ID
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

      //  Create new item based off of 'inc' or 'exp'
      if (type === 'exp') {
        newItem: new Expense(ID, des, value);
      } else if (type === 'inc') {
        newItem: new Income(ID, des, value);
      }

      //  Push new item to data structure
      data.allItems[type].push(newItem);

      //  Return the new element
      return newItem;
    }
  };
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
