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

    totals: {
      exp: 0,
      inc: 0
    }
  };

  

  return {
    
    addItem: function(type, des, val) {
      let newItem, ID;

      //  Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //  Create new item based off of 'inc' or 'exp'
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      };

      //  Push new item to data structure
      data.allItems[type].push(newItem);

      //  Return the new element
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//  UI CONTROLLER
let UIController = (function() {
  let DOMstrings = {
    inputBtn: ".add__btn",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputType: ".add__type",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  return {
    clearFields: function () {
      let fields, fieldsArr;
      
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function (obj, type) {
      let html, newHtml, element;

      //Create html string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
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

    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  /*
  ctrlAddItem = function() {
    var input, newItem;

    //1.  Get the field input data
    input = UICtrl.getInput();
    //2.  Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //3.  Add the item to the UI
    UICtrl.addListItem(newItem, input.type);
    //4.  Calculate the budget
    //5.  Display the budget on the UI
  };
  */

  var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();        
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
           
            
            // 6. Calculate and update percentages
           
        }
    };

  return {
    init: function() {
      console.log("Application has started.");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
