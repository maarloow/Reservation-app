$(function () {
    // define the application
    var ReservationApp = {};

    (function (app) {

        //variables and functions

        app.init = function () {
            console.log("init");
            app.db();
            app.bindings();
        };

        app.bindings = function () {
            $('#addCustomer').bind('click', function (e) {
                // Get customer data when form is submitted successfully
                $('#customerForm').submit(function (e) {
                    e.preventDefault();

                    let newCustomer = customer(
                        $('#fName').val(),
                        $('#lName').val(),
                        $('#birthDate').val(),
                        $('#city').val(),
                        $('#adress').val(),
                        $('#email').val(),
                        $('#phone').val()
                    );

                    app.addCustomer(newCustomer);
                });
            });

            $('#addCar').bind('click', function (e) {

                // Get car data when form is submitted successfully
                $('#carForm').submit(function (e) {
                    e.preventDefault();

                    let newCar = car(
                        $('#registration').val(),
                        $('#make').val(),
                        $('#model').val(),
                        $('#engineSize').val(),
                        $('#color').val(),
                        $('#numberOfSeats').val(),
                        $('#numberOfDoors').val(),
                        $('#dailyRate').val(),
                        $('#imageSide').val(),
                        $('#imageFront').val()
                    );
                    app.addCar(newCar);
                });
            });

            $('#search_customer').bind('click', function (e) {

                // search for customers in database
                let searchQuery = $('#firstName').val();
                console.log(searchQuery);
                app.searchCustomer(searchQuery);
            });

            $('#search_car-btn').bind('click', function (e) {

                // search for cars in database
                let searchQuery = $('#carName').val();
                console.log(searchQuery);
                app.searchCar(searchQuery);
            });

            $(".readonly").keydown(function (e) {

                e.preventDefault();
            });

            $("#commit-car-reservation").bind('click', function (e) {
                console.log("sub");
                $("#carRentForm").submit(function (e) {

                    e.preventDefault();
                    //#fromDate, toDate, getItem("reg/id")
                    let fromDate = $("#fromDate").val();
                    let toDate = $("#toDate").val();
                    let milage = $("#milage").val();
                    var storage = window.localStorage;

                    let carReg = storage.getItem("reg");
                    let customerId = storage.getItem("id");
                    console.log(fromDate + " " + toDate + " " + carReg + " " + customerId + " " + milage);
                    let newReservation = reservation(customerId, carReg, fromDate, toDate, milage);
                    app.addReservation(newReservation);
                });
            });

            $(".back-btn").bind('click', function (e) {
                app.hideAllPages();
                $("#page1").css("display", "block");
            });

            $("#button-page2").bind('click', function (e) {
                app.hideAllPages();
                $("#page2").css("display", "block");
            });

            $("#button-page3").bind('click', function (e) {
                app.hideAllPages();
                $("#page3").css("display", "block");
            });

            $("#button-page4").bind('click', function (e) {
                app.hideAllPages();
                $("#page4").css("display", "block");
            });

        };

        app.db = function () {


            var db = openDatabase('rentaltest.db', '1.0', 'description', 1 * 1024 * 1024, () => {
                //Runs if a database had to be created

                //Create tables
                let sqlCreateCustomerTable = 'CREATE TABLE Customers (\
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,\
    first_name TEXT NOT NULL,\
    last_name TEXT NOT NULL,\
    date_of_birth DATE NOT NULL,\
    city TEXT NOT NULL,\
    adress TEXT NOT NULL,\
    email TEXT,\
    phone INTEGER NOT NULL\
);';

                let sqlCreateCarTable = 'CREATE TABLE Cars (\
    registration TEXT PRIMARY KEY,\
    make TEXT NOT NULL,\
    model TEXT NOT NULL,\
    engine_size TEXT NOT NULL,\
    color TEXT NOT NULL,\
    number_of_seats INTEGER NOT NULL,\
    number_of_doors INTEGER NOT NULL,\
    daily_rate DECIMAL(10,2) NOT NULL,\
    image_side TEXT,\
    image_front TEXT\
);';

                db.transaction(function (tx) {
                    //Create customer table if it does not exist
                    tx.executeSql(sqlCreateCustomerTable, [], () => console.log("created customer table"), (err, error) => console.log(error));
                    tx.executeSql(sqlCreateCarTable, [], () => console.log("created car table"), (err, error) => console.log(error));
                });

                console.log("Database created");
            });

        };



        app.addCustomer = function (customer) {
            console.log(customer);

            let sqlInsert = "INSERT INTO Customers VALUES ( null,'" + customer.firstName + "','"
                + customer.lastName + "','"
                + customer.dateOfBirth + "','"
                + customer.city + "','"
                + customer.adress + "','"
                + customer.email + "','"
                + customer.phone + "');";
            console.log(sqlInsert);
            var db = openDatabase('rentaltest.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //Insert customer data
                tx.executeSql(sqlInsert,[],() => console.log("Customer inserted to DB"),(err, error) => console.log(error));
            });
        }

        app.addCar = function (car) {
            console.log(car);

            let sqlInsert = "INSERT INTO Cars VALUES ('" + car.registration + "','"
                + car.make + "','"
                + car.model + "','"
                + car.engineSize + "','"
                + car.color + "','"
                + car.numberOfSeats + "','"
                + car.numberOfDoors + "','"
                + car.dailyRate + "','"
                + car.imageSide + "','"
                + car.imageFront + "');"

            console.log(sqlInsert,[],() => console.log("Car inserted to DB"),(err, error) => console.log(error));
            var db = openDatabase('rentaltest.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //Create car table if it does not exist
                //tx.executeSql(sqlCreateCarTable);
                //tx.executeSql(sqlCreate);
                //Insert car data
                tx.executeSql(sqlInsert);
            });
        }

        app.addReservation = function (reservation) {
            let sqlInsert = "INSERT INTO Car_Reservation VALUES (null, '" + reservation.customer_id + "','"
                + reservation.registration + "','"
                + reservation.fromDate + "','"
                + reservation.toDate + "','"
                + reservation.milage + "');";
            console.log(sqlInsert);
            let sqlCreateReservationTable = "CREATE TABLE IF NOT EXISTS Car_Reservation (\
                    car_reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,\
                    customer_id INTEGER NOT NULL,\
                    car_registration TEXT NOT NULL,\
                    reservation_fromDate DATE NOT NULL,\
                    reservation_toDate DATE NOT NULL,\
                    milage_options integer,\
                    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),\
                    FOREIGN KEY (car_registration) REFERENCES Cars(registration)";
            var db = openDatabase('reservation.db', '1.1', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //Create car table if it does not exist
                tx.executeSql(sqlCreateReservationTable, [], () => {
                    //Insert car data
                    tx.executeSql(sqlInsert);
                }, (err, error) => {
                    console.log(error);
                    console.log(err);
                });

            });
        }

        // app.searchCustomer = function(name){
        //     var db = openDatabase('reservation.db', '1.1', 'description', 1 * 1024 * 1024)
        //     db.transaction(function (tx) {
        //         //select customer data
        //         let sql = "SELECT * FROM Customers WHERE first_name LIKE '%"+ name +"%';";
        //         console.log(sql);
        //         tx.executeSql(sql, [], function (tx, results){
        //             var len = results.rows.length;
        //             let msg = "<p> Customer(s) found: " + len + "</p>";
        //             console.log(msg);
        //             $("#resultRows").append(msg);
        //             $("#table-customers__rows").empty();
        //             for(let i = 0; i < len; i++){
        //                 console.log(results.rows.item(i).last_name)
        //                 $("#table-customers__rows").append("<tr>\
        //                 <th>4</th>\
        //                 <td><a data-rel='external'>"+ results.rows.item(i).last_name +"</a></td>\
        //                 <td>1972</td>\
        //                 <td>97%</td>\
        //                 <td>87</td>\
        //               </tr>");
        //             }
        //         }, (err, errorStatement) => {
        //             console.log(errorStatement);
        //         });                   

        //     });
        // }
        app.searchCustomer = function (searchQuery) {

            var db = openDatabase('reservation.db', '1.1', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select car data
                let sql = "SELECT * FROM Customers WHERE first_name LIKE '%" + searchQuery + "%' OR last_name LIKE '%" + searchQuery + "%';";
                console.log(sql);
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length;
                    let msg = "<p> Customers(s) found: " + len + "</p>";
                    console.log(msg);
                    $("#customerResultRows").empty();
                    $("#customerResultRows").append(msg);
                    $("#customerTable").empty();
                    $("#customerTable").append("<table data-role='table' id='table-customers' data-mode='columntoggle'\
                            class='ui-responsive table-stroke'>\
                            <thead>\
                            <tr>\
                                <th data-priority='2' >Name</th>\
                                <th data-priority='3'>Birth</th>\
                                <th data-priority='4'>Adress</th>\
                            </tr>\
                        </thead>\
                        <tbody id='table-customer__rows'>\
                        </tbody>\
                        </table>");

                    for (let i = 0; i < len; i++) {
                        console.log(results.rows.item(i).first_name);
                        $("#table-customer__rows").append("\
                            <tr class='add-customer' id="+ results.rows.item(i).customer_id + ">\
                            <td>"+ results.rows.item(i).first_name + " " + results.rows.item(i).last_name + "</td>\
                            <td >"+ results.rows.item(i).date_of_birth + "</td>\
                            <td >"+ results.rows.item(i).adress + "</td>\
                          </tr>");
                    }

                    $('.add-customer').bind('click', function (e) {

                        // rent cars
                        app.searchCustomerById(this.id);
                        app.tempCustomerStorage(this.id);
                    });

                    let item = $(".add-customer");

                    console.log(item.length);
                    for (let i = 0; i < item.length; i++) {

                        $(item[i]).bind('click', function (e) {
                            console.log(this.id)
                        });
                    }
                }, (err, errorStatement) => {
                    console.log(errorStatement);
                });

            });
        }

        app.searchCustomerById = function (id) {

            var db = openDatabase('reservation.db', '1.1', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select car data
                let sql = "SELECT * FROM Customers WHERE customer_id = '" + id + "';";


                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length;
                    let msg = "<p> Car(s) found: " + len + "</p>";
                    console.log(msg);
                    $("#chosenCustomer").val("");
                    for (let i = 0; i < len; i++) {
                        //console.log(results.rows.item(i).make);
                        $("#chosenCustomer").val(results.rows.item(i).first_name + " " + results.rows.item(i).last_name + " " + results.rows.item(i).customer_id);
                    }
                }, null);
            });
        }
        app.tempCustomerStorage = function (id) {
            var storage = window.localStorage;
            storage.setItem("id", id);
        }
        /////////////////////////////////////
        app.searchCar = function (searchQuery) {
            var db = openDatabase('rentaltest.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select car data
                let sql = "SELECT * FROM Cars WHERE make LIKE '%" + searchQuery + "%' OR model LIKE '%" + searchQuery + "%';";
                console.log(sql);
                tx.executeSql(sql, [], function (tx, results) {
                     var len = results.rows.length;
                    // let msg = "<p> Car(s) found: " + len + "</p>";
                    console.log(results);
                    $("#carRentalPage").css("display", "none");
                    $("#carListPage").css("display", "block");

                    $(".requirements").append('<div class="requirements__requirement">\
                    <p class="u-inline-block">\
                       '+ searchQuery + '\
                    </p>\
                    <p class="u-inline-block" id="remove">\
                        X\
                    </p>\
                </div>');

                    for(let i = 0; i < len; i++)
{
                    $(".cars-list").append('\
                    <article class="car" id="'+ results.rows.item(i).registration +'">\
                    <div class="car__info">\
                        <h2 class="car__info-header" id="car-name">'+ results.rows.item(i).make + " " + results.rows.item(i).model + '</h2>\
                        <p class="car__info-price" id="car-price">'+ results.rows.item(i).daily_rate + "€/day" +'</p>\
                    </div>\
                    <div class="car__image-box">\
                        <img src="img/'+ results.rows.item(i).image_side +'" id="car-image" alt="" class="car-image">\
                    </div>\
                </article>')
}
                //     console.log(msg);
                //     $("#carResultRows").empty();
                //     $("#carResultRows").append(msg);
                //     $("#carTable").empty();
                //     $("#carTable").append("<table data-role='table' id='table-cars' data-mode='columntoggle'\
                //             class='ui-responsive table-stroke'>\
                //             <thead>\
                //             <tr>\
                //                 <th data-priority='2' >Car</th>\
                //                 <th data-priority='3'>Daily rate</th>\
                //                 <th data-priority='4'>Seating</th>\
                //                 <th data-priority='5'>Doors</th>\
                //                 <th data-priority='6'>Reg</th>\
                //             </tr>\
                //         </thead>\
                //         <tbody id='table-car__rows'>\
                //         </tbody>\
                //         </table>");


                //     for (let i = 0; i < len; i++) {
                //         console.log(results.rows.item(i).make);
                //         $("#table-car__rows").append("\
                //             <tr class='add-car' id="+ results.rows.item(i).registration + ">\
                //             <td>"+ results.rows.item(i).make + " " + results.rows.item(i).model + "</td>\
                //             <td >"+ results.rows.item(i).daily_rate + "</td>\
                //             <td >"+ results.rows.item(i).number_of_seats + "</td>\
                //             <td >"+ results.rows.item(i).number_of_doors + "</td>\
                //             <td >"+ results.rows.item(i).registration + "</td>\
                //           </tr>");
                //     }

                //     $('.add-car').bind('click', function (e) {

                //         // rent car


                //         app.searchCarByReg(this.id);
                //         app.tempCarStorage(this.id);
                //     });

                //     let item = $(".add-car");

                //     console.log(item.length);
                //     for (let i = 0; i < item.length; i++) {

                //         $(item[i]).bind('click', function (e) {
                //             console.log(this.id)
                //         });

                //     }
                // }, (err, errorStatement) => {
                //     console.log(errorStatement);
                 });

            });

        }

        app.searchCarByReg = function (reg) {

            var db = openDatabase('reservation.db', '1.1', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select car data
                let sql = "SELECT * FROM Cars WHERE registration = '" + reg + "';";

                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length;
                    let msg = "<p> Car(s) found: " + len + "</p>";
                    console.log(msg);
                    $("#chosenCar").val("");
                    for (let i = 0; i < len; i++) {
                        console.log(results.rows.item(i).make);
                        $("#chosenCar").val(results.rows.item(i).make + " " + results.rows.item(i).model + " " + results.rows.item(i).registration.toUpperCase());
                    }
                }, null);
            });
        }

        app.tempCarStorage = function (reg) {
            console.log(reg);
            let id = "reg";
            var storage = window.localStorage;
            storage.setItem(id, reg);
            let item = storage.getItem(id);
            console.log("reg: " + item);
        }
        app.commitCarReservation = function (carReg, customerId) {
        }

        app.isCarFree = function (fromDate, toDate) {

        }

        app.hideAllPages = function () {
            $('[data-role="page"]').css("display", "none");
        }


        app.init();
    })(ReservationApp);

});