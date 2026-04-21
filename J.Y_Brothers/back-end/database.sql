CREATE TABLE Profile (
    Profile_ID INT PRIMARY KEY,
    Business_Name VARCHAR(255),
    Last_Name VARCHAR(100),
    First_Name VARCHAR(100),
    Middle_Name VARCHAR(100),
    Zip VARCHAR(10),
    Province VARCHAR(100),
    Postal_Code VARCHAR(20),
    Contact_No VARCHAR(20),
    Credit_Limit DECIMAL(10,2)
);

CREATE TABLE Supplier (
    Supplier_ID INT PRIMARY KEY,
    Profile_ID INT,
    FOREIGN KEY (Profile_ID) REFERENCES Profile(Profile_ID)
);

CREATE TABLE Customer (
    Customer_ID INT PRIMARY KEY,
    Profile_ID INT,
    FOREIGN KEY (Profile_ID) REFERENCES Profile(Profile_ID)
);

CREATE TABLE Category (
    Category_ID INT PRIMARY KEY,
    Category_Name VARCHAR(100)
);

CREATE TABLE Product (
    Product_ID INT PRIMARY KEY,
    Product_Name VARCHAR(255),
    Category_ID INT,
    Price DECIMAL(10,2),
    Stock_Quantity INT DEFAULT 0,
    FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID)
);

CREATE TABLE `Order` (
    Order_ID INT PRIMARY KEY AUTO_INCREMENT,
    Customer_ID INT,
    Order_Date_Created DATE,
    Total DECIMAL(10,2),
    Payment_Status VARCHAR(50) DEFAULT 'Pending',
    Order_Status VARCHAR(50) DEFAULT 'New',
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID)
);

CREATE TABLE Order_Detail (
    Order_ID INT,
    Product_ID INT,
    Quantity INT,
    Subtotal DECIMAL(10,2),
    PRIMARY KEY (Order_ID, Product_ID),
    FOREIGN KEY (Order_ID) REFERENCES `Order`(Order_ID),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID)
);

CREATE TABLE Supply (
    Supply_ID INT PRIMARY KEY,
    Supplier_ID INT,
    Supply_Delivery_Date DATE,
    FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID)
);

CREATE TABLE Supply_Detail (
    Supply_ID INT,
    Product_ID INT,
    Quantity INT,
    PRIMARY KEY (Supply_ID, Product_ID),
    FOREIGN KEY (Supply_ID) REFERENCES Supply(Supply_ID),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID)
);

CREATE TABLE Employee (
    Employee_ID INT PRIMARY KEY,
    Last_Name VARCHAR(100),
    First_Name VARCHAR(100),
    Middle_Name VARCHAR(100),
    Passport_Number VARCHAR(50),
    Phone VARCHAR(20),
    Role ENUM('office_worker', 'checker', 'laborer', 'driver') DEFAULT 'laborer'
);

CREATE TABLE Truck (
    Truck_Plate_Number VARCHAR(20) PRIMARY KEY,
    Employee_ID INT,
    Truck_Type ENUM('Panel', 'Forward', '10Wheel'),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Order_Delivery (
    Order_Delivery_ID INT PRIMARY KEY AUTO_INCREMENT,
    Order_ID INT,
    Truck_Plate_Number VARCHAR(20),
    Order_Delivery_Date DATE,
    Delivery_Status VARCHAR(50) DEFAULT 'Preparing',
    FOREIGN KEY (Order_ID) REFERENCES `Order`(Order_ID),
    FOREIGN KEY (Truck_Plate_Number) REFERENCES Truck(Truck_Plate_Number)
);

