

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

function car(registration, make, model, engineSize, color, numberOfSeats, numberOfDoors, dailyRate, imageSide, imageFront, transmission, fuel) {
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
        imageFront : imageFront,
        transmission : transmission,
        fuel : fuel
    };
  return car;
}

function reservation(customer_id, car_registration, from_date, to_date, milage) {
  let reservation = {
customer_id : customer_id,
car_registration : car_registration,
from_date : from_date,
to_date : to_date,
milage : milage
  };
return reservation;
}