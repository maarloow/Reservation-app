$(function () {

    // INSERT INTO Cars VALUES ('RTF-852','Tesla','Model 3','240','White','5','5','40','tesla3.jpg','tesla3-front.png');

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
            $('#getCustomerForm-btn').bind('click', function (e) {
                $("#addCustomerPage").css("display", "block");
                $("#carRentalPage").css("display", "none");
            });
           // $('#addCustomer').bind('click', function (e) {
                //console.log("add customer button triggered!")
                // Get customer data when form is submitted successfully
                $('#addCustomerForm').submit(function (e) {
                    e.preventDefault();
                    
                    let newCustomer = customer(
                        $('#fName').val(),
                        $('#lName').val(),
                        $('#birth').val(),
                        $('#city').val(),
                        $('#street').val(),
                        $('#phone').val(),
                        $('#email').val()

                    );
                    $('#addCustomerForm')[0].reset();
                    $("#addCustomerPage").css("display", "none");
                    $("#carRentalPage").css("display", "block");
                    console.log("add customer function next!");
                    app.addCustomer(newCustomer);
                    app.searchCustomerById();
                });
            //});
            
         
                // Get car data when form is submitted successfully
                $('addCar').bind('click', function(e){
                    console.log("submit clicked");

                
                
                    console.log("submit clicked");
                    e.preventDefault();

                    let newCar = car(
                        $('#registration').val(),
                        $('#make').val(),
                        $('#model').val(),
                        $('#engine').val(),
                        $('#color').val(),
                        $('#seats').val(),
                        $('#doors').val(),
                        $('#rate').val(),
                        $('#image-side').val(),
                        $('#image-front').val(),
                        $('#transmission').val(),
                        $('#fuel').val()
                    );
                    console.log(newCar);
                    app.addCar(newCar);
               
            });

            $('#search_customer-btn').bind('click', function (e) {

                // search for customers in database
                let searchQuery = $('#firstName').val();
                console.log(searchQuery);
                app.searchCustomer(searchQuery);
            });

            $('#search_car-btn').bind('click', function (e) {
                if($('#fromDate').val() != "" && $('#toDate').val() && $('#fromDate').val() < $('#toDate').val())
                {
                // search for cars in database
                let searchQuery = $('#carName').val();
                let from_date = $('#fromDate').val();
                let to_date = $('#toDate').val();
                console.log(searchQuery);
                app.searchCar(searchQuery, from_date, to_date);
                }
                else if($('#fromDate').val() > $('#toDate').val()){
                    navigator.notification.alert(
                        'Your "from" date can not be set later than your "to" date!',  // message
                        null,         // callback
                        'Error',            // title
                        'OK'                  // buttonName
                    );
                }
                else{
                    
                    navigator.notification.alert(
                        'Set reservation dates first!',  // message
                        null,         // callback
                        'Error',            // title
                        'OK'                  // buttonName
                    );
                }
            });

            $(".readonly").keydown(function (e) {

                e.preventDefault();
            });

//  MAKE CAR RESERVATION //
            $("#commit-car-reservation").bind('click', function (e) {
                console.log("sub");
                $("#carRentForm").submit(function (e) {

                    e.preventDefault();
                    //#fromDate, toDate, getItem("reg/id")
                    let from_date = $("#fromDate").val();
                    let to_date = $("#toDate").val();
                    let milage = $("#milage").val();
                    let customer_id = $(".single-customer")[0].id;
                    let car_registration = $(".single-car")[0].id;
                    console.log($(".single-car")[0]);
                    console.log(from_date + " " + to_date + " " + car_registration + " " + customer_id + " " + milage);
                    let newReservation = reservation(customer_id, car_registration, from_date, to_date, milage);
                    app.addReservation(newReservation);
                });
            });

            $(".back-btn").bind('click', function (e) {
                app.hideAllPages();
                $("#page1").css("display", "block");
            });

            $(".backToRentalForm").bind('click', function (e) {
                $("#addCustomerPage").css("display", "none");
                $("#carListPage").css("display", "none");
                $("#customerListPage").css("display", "none");
                $("#carRentalPage").css('display', 'block');

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


            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024, () => {
                //Runs if a database had to be created

                //Create tables
                let sqlCreateCustomerTable = 'CREATE TABLE Customers (\
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,\
    first_name TEXT NOT NULL,\
    last_name TEXT NOT NULL,\
    birth DATE NOT NULL,\
    city TEXT NOT NULL,\
    street TEXT NOT NULL,\
    phone INTEGER NOT NULL,\
    email TEXT NOT NULL\
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
    image_front TEXT,\
    transmission TEXT,\
    fuel TEXT\
);';

                let sqlCreateReservationTable = "CREATE TABLE Car_Reservation (\
    rental_id INTEGER PRIMARY KEY AUTOINCREMENT,\
    customer_id INTEGER NOT NULL,\
    car_registration TEXT NOT NULL,\
    from_date DATE NOT NULL,\
    to_date DATE NOT NULL,\
    milage integer,\
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),\
    FOREIGN KEY (car_registration) REFERENCES Cars(registration));";




                db.transaction(function (tx) {
                    //Create customer table if it does not exist
                    tx.executeSql(sqlCreateCustomerTable, [], () => {


                        console.log("created customer table")
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Kalle','Persson','1991-04-04','Vasa','Vasaesplanaden 21','0405251267','Kalle@m.fi')");
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Ville','Holm','1992-08-04','Åbo','Götagatan 22','0409856237','Ville@m.fi')");
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Dal','Kvist','1981-06-04','Åbo','Strandgatan 20','0409851467','Dal@m.fi')");
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Johan','Holm','1971-05-04','Umeå','Pilvägen 40','0402855467','Johan@m.fi')");
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Tim','Kvist','1981-01-04','Umeå','Snårgränd 25','0409853347','Tim@m.fi');");
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Dalin','Persson','1991-04-03','Karleby','Tornstigen 22','0409541267','Dalin@m.fi')");
                        tx.executeSql("INSERT INTO Customers VALUES (NULL,'Palle','Sten','1981-04-02','Umeå','Sjövägen 24','0409855687','Palle@m.fi')");


                        tx.executeSql(sqlCreateCarTable, [], () => {
                            console.log("created car table")

                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-852','Tesla','Model 3','240','White','5','5','40','tesla3.jpg','tesla3-front.png', 'Automatic', 'Electric')");
                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-853','Tesla','Model X','259','Black','5','5','50','teslaX.jpg','teslaX-front.jpg', 'Automatic', 'Electric')");
                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-854','Tesla','Model S','480','Blue','5','5','65','teslaS.jpg','teslaS-front.jpg', 'Automatic', 'Electric')");
                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-855','BMW','M5','280','Red','5','5','205','bmwm5.jpg','bmwm5-front.jpg', 'Manual', 'Gas')");
                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-856','Ferrari','California','590','Red','5','5','350','ferrarricalifornia.jpg','ferrarricalifornia-front.jpg', 'Manual', 'Gas')");
                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-857','Mercedes','Benz C','175','Silver','5','5','170','mercedesbenzc.jpg','mercedesbenzc-front.jpg', 'Manual', 'Gas')");
                            tx.executeSql("INSERT INTO Cars VALUES ('RTF-858','BMW','X6','175','Black','5','5','140','bmwx6.jpg','bmwx6-front.jpg', 'Manual', 'Gas')");

                            tx.executeSql(sqlCreateReservationTable, [], () => {
                        
                                tx.executeSql("INSERT INTO Car_Reservation VALUES (null,'1','RTF-852','2020-01-01','2020-03-05','200');");
                                tx.executeSql("INSERT INTO Car_Reservation VALUES (null,'1','RTF-854','2020-01-01','2020-03-05','200');");
                                tx.executeSql("INSERT INTO Car_Reservation VALUES (null,'1','RTF-857','2020-02-02','2020-03-03','200');");

                            }, (err, error) => {
                                console.log(error);
                                console.log(err);
                            });

                        }, (err, error) => console.log(error));
                    }, (err, error) => console.log(error));





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
                + customer.street + "','"
                + customer.email + "','"
                + customer.phone + "');";
            console.log(sqlInsert);
            if(customer.lastName != "" && customer.dateOfBirth !="" && customer.lastName !="" && customer.dateOfBirth !="" && customer.city !="" && customer.street !="" && customer.email !="" && customer.phone !=""){
            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //Insert customer data
                tx.executeSql(sqlInsert, [], () => {
                    console.log("Customer inserted to DB");
                    //app.searchCustomerById(app.getLatestCustomerId());
                }, (err, error) => console.log(error));
            });
        }
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
                + car.imageFront + "','"
                + car.transmission + "','"
                + car.fuel + "');"

            console.log(sqlInsert, [], () => console.log("Car inserted to DB"), (err, error) => console.log(error));
            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
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
                + reservation.car_registration + "','"
                + reservation.from_date + "','"
                + reservation.to_date + "','"
                + reservation.milage + "');";
            console.log(sqlInsert);

            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) { 
                    tx.executeSql(sqlInsert);
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

            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select car data
                let sql = "SELECT * FROM Customers WHERE first_name LIKE '%" + searchQuery + "%' OR last_name LIKE '%" + searchQuery + "%';";
                console.log(sql);
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length;
                    let msg = "<p> Customers(s) found: " + len + "</p>";
                    console.log(msg);


                    for (let i = 0; i < len; i++) {
                        console.log(results.rows.item(i).first_name);
                        $(".customer-list").append('\
                        <article class="customer" id="'+ results.rows.item(i).customer_id + '">\
                        <div class="customer-info">\
                            <h2 class="customer__name">'+ results.rows.item(i).first_name + " " + results.rows.item(i).last_name + '</h2>\
                            <p class="customer__adress">Adress '+ results.rows.item(i).street + " " + results.rows.item(i).city + '</p>\
                            <p class="customer__birth">Birth: '+ results.rows.item(i).birth + '</p>\
                            <p class="Customer__id">Customer ID: '+ results.rows.item(i).customer_id + '</p>\
                            <p class="customer__details-btn">Details ></p>\
                        </div>\
                    </article>');

                    }

                    $("#carRentalPage").css("display", "none");
                    $("#customerListPage").css("display", "block");

                    $('.customer').bind('click', function (e) {

                        // rent car
                        app.searchCustomerById(this.id);
                        //app.tempCarStorage(this.id);
                    });

                    // let item = $(".add-customer");

                    // console.log(item.length);
                    // for (let i = 0; i < item.length; i++) {

                    //     $(item[i]).bind('click', function (e) {
                    //         console.log(this.id)
                    //     });
                    // }
                }, (err, errorStatement) => {
                    console.log(errorStatement);
                });

            });
        }

        app.searchCustomerById = function (id = null) {

            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select customer
                let sql = "SELECT * FROM Customers WHERE customer_id = '" + id + "';";
                // selects latest added customer if value = null
                if(id == null) sql = "SELECT * FROM Customers ORDER BY customer_id DESC LIMIT 1";


                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length;
                    let msg = "<p> Customer(s) found: " + len + "</p>";
                    console.log(msg);
                    $("#chosenCustomer").val("");
                    $("#addedCustomer").empty();
                    for (let i = 0; i < len; i++) {
                        //console.log(results.rows.item(i).make);
                        $("#chosenCustomer").val(results.rows.item(i).first_name + " " + results.rows.item(i).last_name + " " + results.rows.item(i).customer_id);
                        $("#addedCustomer").append('\
                        <article class="customer single-customer" id="'+ results.rows.item(i).customer_id + '">\
                        <div class="customer-info">\
                            <h2 class="customer__name">'+ results.rows.item(i).first_name + " " + results.rows.item(i).last_name + '</h2>\
                            <p class="customer__adress">Adress '+ results.rows.item(i).street + " " + results.rows.item(i).city + '</p>\
                            <p class="customer__birth">Birth: '+ results.rows.item(i).birth + '</p>\
                            <p class="Customer__id">Customer ID: '+ results.rows.item(i).customer_id + '</p>\
                        </div>\
                    </article>');
                    }
                }, null);


                $("#carRentalPage").css("display", "block");
                $("#customerListPage").css("display", "none");
            });
        }


        app.getLatestCustomerId = function () {
            let id;
            let sql = "SELECT * FROM Customers ORDER BY customer_id DESC LIMIT 1";
            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                tx.executeSql(sql, [], function (tx, results) {
                    id = results.rows.item(0).customer_id;
                    console.log(results.rows.item(0).customer_id);
                });
        });
        return id;
    }

        app.tempCustomerStorage = function (id) {
            var storage = window.localStorage;
            storage.setItem("id", id);
        }
        /////////////////////////////////////
        app.searchCar = function (searchQuery, from_date, to_date) {


/////////   SQL query that select all cars that are free on the selected time frame 
            let sqlAvailableCars = "Select * \
FROM Cars \
WHERE registration NOT IN \
(\
Select car_registration FROM Car_Reservation \
WHERE ('" + from_date + "' >= from_date AND '"+ from_date +"' < to_date) \
OR ('"+ to_date +"' > from_date AND '"+ to_date +"' >= to_date)\
);"


            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
            db.transaction(function (tx) {
                //select car data
                let sql = "SELECT * FROM Cars WHERE make LIKE '%" + searchQuery + "%' OR model LIKE '%" + searchQuery + "%';";
                console.log(sqlAvailableCars);
                tx.executeSql(sqlAvailableCars, [], function (tx, results) {
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

                    for (let i = 0; i < len; i++) {
                        $(".cars-list").append('\
                    <article class="car" id="'+ results.rows.item(i).registration + '">\
                    <div class="car__info">\
                        <h2 class="car__info-header" id="car-name">'+ results.rows.item(i).make + " " + results.rows.item(i).model + '</h2>\
                        <p class="car__info-price" id="car-price">'+ results.rows.item(i).daily_rate + "€/day" + '</p>\
                    </div>\
                    <div class="car__image-box">\
                        <img src="img/'+ results.rows.item(i).image_side + '" id="car-image" alt="" class="car-image">\
                    </div>\
                </article>')
                    }

                    $('.car').bind('click', function (e) {

                        // rent car
                        app.searchCarByReg(this.id);
                        //app.tempCarStorage(this.id);
                    });

                });

            });

        }

        app.searchCarByReg = function (reg) {

            var db = openDatabase('rentaltest1.db', '1.0', 'description', 1 * 1024 * 1024)
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
                    $(".rentCar").empty();
                    $(".rentCar").append('\
                    <article class="car single-car" id="'+ results.rows.item(0).registration + '">\
                    <div class="car__info">\
                        <h2 class="car__info-header" id="car-name">'+ results.rows.item(0).make + " " + results.rows.item(0).model + '</h2>\
                        <p class="car__info-price" id="car-price">'+ results.rows.item(0).daily_rate + "€/day" + '</p>\
                    </div>\
                    <div class="car__image-box">\
                        <img src="img/'+ results.rows.item(0).image_side + '" id="car-image" alt="" class="car-image">\
                    </div>\
                </article>');
                }, null);
            });
            $("#carRentalPage").css("display", "block");
            $("#carListPage").css("display", "none");

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