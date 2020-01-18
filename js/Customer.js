
function customer(firstName, lastName, dateOfBirth, city, adress, email, phone) {
    let customer = {
    firstName: firstName,
    lastName : lastName,
    dateOfBirth : dateOfBirth,
    city : city,
    adress : adress,
    email : email,
    phone : phone
    };
  return customer;
}

function car(registration, make, model, engineSize, color, numberOfSeats, numberOfDoors, dailyRate) {
    let car = {
        registration : registration,
        make : make,
        model : model,
        engineSize : engineSize,
        color : color,
        numberOfSeats : numberOfSeats,
        numberOfDoors : numberOfDoors,
        dailyRate : dailyRate
    };
  return car;
}

function reservation(customer_id, registration, fromDate, toDate, milage) {
  let reservation = {
customer_id : customer_id,
registration : registration,
fromDate : fromDate,
toDate : toDate,
milage : milage
  };
return reservation;
}