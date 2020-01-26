
function customer(firstName, lastName, dateOfBirth, city, street, phone, email) {
    let customer = {
    firstName: firstName,
    lastName : lastName,
    dateOfBirth : dateOfBirth,
    city : city,
    street : street,
    phone : phone,
    email : email
    
    };
  return customer;
}

function car(registration, make, model, engineSize, color, numberOfSeats, numberOfDoors, dailyRate, imageSide, imageFront) {
    let car = {
        registration : registration,
        make : make,
        model : model,
        engineSize : engineSize,
        color : color,
        numberOfSeats : numberOfSeats,
        numberOfDoors : numberOfDoors,
        dailyRate : dailyRate,
        imageSide : imageSide,
        imageFront : imageFront
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