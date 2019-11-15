let vm = new Vue({
  el: "#app",
  data: {
    burgerMenuItems: menuItems,
    orderPlaced: false,
    orderDetails: {},
    deliveryLocation: {},
    deliveryInfo: {}
  },
  methods: {
    placeOrder: function() {
      this.orderPlaced = true;
      this.orderDetails = getOrderedBurgers();
      this.deliveryInfo = getDeliveryInfo();


    },

    displayOrder: function(event) {
      this.deliveryLocation = {};

      let offset = { 
        x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top
      };

      this.deliveryLocation.x = event.clientX - 10 - offset.x;
      this.deliveryLocation.y = event.clientY - 10 - offset.y;
    }
  }
});

function getOrderedBurgers() {
  let orderedBurgers = [];

  for (menuItem of menuItems) {
    let control = document.querySelector("input[name=" + menuItem.id + "]");
    
    if (control.checked) {
      orderedBurgers.push(menuItem);
    }
  }

  return orderedBurgers;
}

function getDeliveryInfo() {
  let fullName = document.getElementById("full-name").value;
  let email = document.getElementById("email").value;

  return {
    fullName: fullName,
    email: email,
    paymentMethod: getPaymentMethod(),
    gender: getSelectedGender()
  }
}

function getPaymentMethod() {
  let e = document.getElementById("payment-options");
  return e.options[e.selectedIndex].value;
}

function getSelectedGender() {
  let genderOptions = document.getElementsByName("gender-radio");

  // get selected radio button
  let genderRadioId;
  for (let i = 0; i < genderOptions.length; i++) {
    if (genderOptions[i].checked) {
      genderRadioId = genderOptions[i].id;
    }
  }

  // get respective label for the selected radio button
  let labelSelector = "label[for=" + genderRadioId + "]";
  let label = document.querySelector(labelSelector).innerHTML;
  return label;
}