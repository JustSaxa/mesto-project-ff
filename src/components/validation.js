function showInputError (formElement, inputElement, errorMessage, data) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.errorClass);
    
  };
  
  function hideInputError (formElement, inputElement, data) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.inputErrorClass);
    errorElement.textContent = '';
    
  };
  
  function checkInputValidity (formElement, inputElement, data) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, data);
    } else {
      hideInputError(formElement, inputElement, data);
    }
  };
  
  
  
  function hasInvalidInput (inputList) {
   
    return inputList.some((inputElement) => {
        
  
      return !inputElement.validity.valid;
    })
  };
  
  
  
  function toggleButtonState (inputList, buttonElement, data) {
   
    if (hasInvalidInput(inputList)) {
   
      buttonElement.classList.add(data.inactiveButtonClass);
      buttonElement.disabled = true;
  
    } else {
      
          buttonElement.classList.remove(data.inactiveButtonClass);
          buttonElement.disabled = false;
      
    }
  }; 
  
  
  function setEventListeners (formElement, data) {
    const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, data);
        toggleButtonState(inputList, buttonElement, data);
      });
    });
    toggleButtonState(inputList, buttonElement, data);
  };
  
  
 export function clearValidation (formElement, data) {
    const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, data);
    });
    toggleButtonState(inputList, buttonElement, data);
  };
  
 export function enableValidation(data) {
    const formList = Array.from(document.querySelectorAll(data.formSelector)); 
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement, data);
  }); 
  }