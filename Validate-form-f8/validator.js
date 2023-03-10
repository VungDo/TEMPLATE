function Validator(options) {
  const formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(".form-message");
      if (inputElement) {
        inputElement.onblur = function () {
          var errorMessage = rule.test(inputElement.value);
          if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
          } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
          }
        };
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

Validator.isRequired = function (selector) {
  return {
    selector,
    test: function (value) {
      return value.trim() ? undefined : "This field is required";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector,
    test: function () {
      return {
        selector: selector,
        test: function (value) {
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        },
      };
    },
  };
};
