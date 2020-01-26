INSERT INTO Cars VALUES ('RTF-852','Tesla','Model 3','240','White','5','5','40','tesla3.jpg','tesla3-front.png');   
INSERT INTO Cars VALUES ('RTF-853','Tesla','Model X','259','Black','5','5','50','teslaX.jpg','teslaX-front.jpg');
INSERT INTO Cars VALUES ('RTF-854','Tesla','Model S','480','Blue','5','5','65','teslaS.jpg','teslaS-front.jpg');
INSERT INTO Cars VALUES ('RTF-855','BMW','M5','280','Red','5','5','205','bmwm5.jpg','bmwm5-front.jpg');
INSERT INTO Cars VALUES ('RTF-856','Ferrari','California','590','Red','5','5','350','ferrarricalifornia.jpg','ferrarricalifornia-front.jpg');
INSERT INTO Cars VALUES ('RTF-857','Mercedes','Benz C','175','Silver','5','5','170','mercedesbenzc.jpg','mercedesbenzc-front.jpg');
INSERT INTO Cars VALUES ('RTF-858','BMW','X6','175','Black','5','5','140','bmwx6.jpg','bmwx6-front.jpg');




CREATE TABLE Customers (\
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,\
    first_name TEXT NOT NULL,\
    last_name TEXT NOT NULL,\
    birth DATE NOT NULL,\
    city TEXT NOT NULL,\
    street TEXT NOT NULL,\
    phone INTEGER NOT NULL,\
    email TEXT NOT NULL\
);

INSERT INTO Customers VALUES ('NULL','Kalle','Persson','1991-04-04','Vasa','Vasaesplanaden 21','0405251267','Kalle@m.fi');
INSERT INTO Customers VALUES ('NULL','Ville','Holm','1992-08-04','Åbo','Götagatan 22','0409856237','Ville@m.fi');
INSERT INTO Customers VALUES ('NULL','Dal','Kvist','1981-06-04','Åbo','Strandgatan 20','0409851467','Dal@m.fi');
INSERT INTO Customers VALUES ('NULL','Johan','Holm','1971-05-04','Umeå','Pilvägen 40','0402855467','Johan@m.fi');
INSERT INTO Customers VALUES ('NULL','Tim','Kvist','1981-01-04','Umeå','Snårgränd 25','0409853347','Tim@m.fi');
INSERT INTO Customers VALUES ('NULL','Dalin','Persson','1991-04-03','Karleby','Tornstigen 22','0409541267','Dalin@m.fi');
INSERT INTO Customers VALUES ('NULL','Palle','Sten','1981-04-02','Umeå','Sjövägen 24','0409855687','Palle@m.fi');
