

CREATE TABLE Crime(
	DR_NO INT PRIMARY KEY, 			
	Date_Rptd DATE, 			
	Time_OCC INT, 
	AREA INT, 					
	AREA_Name VARCHAR(255), 
	Rpt_Dist_No INT, 				
	Crm_Cd INT, 					
	Crm_Cd_Desc VARCHAR(255), 
	Mocodes INT, 					
	Vict_Age INT, 					
	VIct_Sex CHAR(1), 				
	Vict_Descent CHAR(1), 			
	Premis_Cd INT, 				
	Premis_Desc VARCHAR(255), 		
	Weapon_Used_Cd INT,				
	Weapon_Desc VARCHAR(255),		
	Status CHAR(2),					
	Status_Desc VARCHAR(255),		
	Crm_Cd1 INT,					
	Crm_Cd2 INT,					
	Crm_Cd3 INT,					
	Crm_Cd4 INT,					
	Location VARCHAR(255),			
	Cross_Street VARCHAR(255),		
	LAT REAL,						
	LON REAL,						
	FOREIGN KEY (LAT, LON) REFERENCES Location(LAT, LON)
);

CREATE TABLE Rent(	
	Row_ID VARCHAR(255) PRIMARY KEY,	
	Year INT, 						
	Amount INT, 					
	Tract VARCHAR(255), 			
	Tract_Number INT,				
	Neighborhood VARCHAR(255),		
	GEOID VARCHAR(255),				
	LAT REAL,
	LON REAL,
	Date DATE,					
	FOREIGN KEY (LAT, LON) REFERENCES Location(LAT, LON)
);



CREATE TABLE Date(
	Year INT,						
	Date_OCC DATE,					
	PRIMARY KEY (Year,Date_OCC)
);

CREATE TABLE User(
	UserID INT PRIMARY KEY,			
	UnderName VARCHAR(255),			
	Password VARCHAR(255),			
	Email VARCHAR(255)
);

CREATE TABLE CrimeRate(
	RateNum INT PRIMARY KEY,		
	rateDescroption VARCHAR(255)
);

CREATE TABLE Location(
	LAT REAL,				
	LON REAL,	
    RateNum INT,	
	PRIMARY KEY (LAT,LON),
	FOREIGN KEY (RateNum) REFERENCES CrimeRate(RateNum)
);

CREATE TABLE LocationFavourite(
 	AddTime INT, 
	Category VARCHAR(255),
	AddDescription VARCHAR(225),
 	UserID INT,
	LAT REAL,
	LON REAL,
 	PRIMARY KEY (UserID,LAT,LON),
 	FOREIGN KEY (UserID) REFERENCES User(UserID),
	FOREIGN KEY (LAT, LON) REFERENCES Location(LAT, LON)
);


DROP TABLE Rent_raw; 
CREATE TABLE Rent_raw(	
	Year INT, 
	Amount INT, 					
	Tract VARCHAR(255), 			
	Tract_Number INT,				
	Neighborhood VARCHAR(255),		
	GEOID VARCHAR(255),				
    Row_ID VARCHAR(255) PRIMARY KEY,
	Date DATE,
    LAT REAL,
	LON REAL
);

DROP TABLE Crime_raw;
CREATE TABLE Crime_raw(
	DR_NO INT PRIMARY KEY, 			
	Date_Rptd DATE, 			
	Time_OCC INT, 
	AREA INT, 					
	AREA_Name VARCHAR(255), 
	Rpt_Dist_No INT, 				
	Crm_Cd INT, 					
	Crm_Cd_Desc VARCHAR(255), 
	Mocodes INT, 					
	Vict_Age INT, 					
	VIct_Sex CHAR(1), 				
	Vict_Descent CHAR(1), 			
	Premis_Cd INT, 				
	Premis_Desc VARCHAR(255), 		
	Weapon_Used_Cd INT,				
	Weapon_Desc VARCHAR(255),		
	Status CHAR(2),					
	Status_Desc VARCHAR(255),		
	Crm_Cd1 INT,					
	Crm_Cd2 INT,					
	Crm_Cd3 INT,					
	Crm_Cd4 INT,					
	Location VARCHAR(255),			
	Cross_Street VARCHAR(255),		
	LAT REAL,						
	LON REAL				
);





SELECT * FROM Rent_raw LIMIT 15;
SELECT * FROM Crime_raw LIMIT 15;

GRANT FILE ON *.* TO 'root'@'34.123.55.32:3306';
FLUSH PRIVILEGES;


LOAD DATA INFILE 'F:/university/UIUC/23SUMMER/Project/su23-cs411-team003-Lazy/src/datasets/Rent_Price_LA_clean.csv' 
INTO TABLE Rent 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(Row_ID, Year, Amount, Tract, Tract_Number, Neighborhood, GEOID, LAT, LON, Date);

DELETE FROM Crime_raw
WHERE Date_Rptd = 0000-00-00;


INSERT INTO table2 ( name , price ) 
	SELECT name , price  FROM table1  WHERE id=5;

ALTER TABLE Crime_raw
ADD COLUMN Year INT;

INSERT INTO CrimeRate VALUES (-1, "Undefined crime rate");

UPDATE Crime_raw
SET Year = EXTRACT(YEAR FROM Date_Rptd);

INSERT INTO Date (Year, Date_OCC)
(SELECT DISTINCT Year, Date_Rptd
FROM Crime_raw)
UNION
(SELECT DISTINCT Year, Date
FROM Rent_raw);

SELECT COUNT(*) FROM Date LIMIT 15;

TRUNCATE TABLE my_table;

ALTER TABLE Location
DROP COLUMN Tract;
-- Select * from Location;
-- AREA_Name VARCHAR(255),			
-- 	Neighborhood VARCHAR(255),		
-- 	Tract VARCHAR(255),	

TRUNCATE TABLE Location;
INSERT INTO Location (LAT, LON, RateNum)
(SELECT DISTINCT ROUND(LAT, 3), ROUND(LON, 3), -1
FROM Crime_raw)
UNION
(SELECT DISTINCT ROUND(LAT, 3), ROUND(LON, 3), -1
FROM Rent_raw);

SELECT COUNT(*)
FROM (
    SELECT DISTINCT ROUND(LAT, 3), ROUND(LON, 3)
    FROM Crime_raw
) AS alias_table;

SELECT COUNT(*)
FROM (
    SELECT DISTINCT ROUND(LAT, 3), ROUND(LON, 3)
    FROM Rent_raw
) AS alias_table;

SELECT * FROM Location LIMIT 15;

ALTER TABLE LocationFavourite
DROP FOREIGN KEY LocationFavourite_ibfk_2;


TRUNCATE TABLE Location;
DROP TABLE Location;


