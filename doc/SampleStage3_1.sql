SQL Query1:
USE proj_rent_crime;

DROP TABLE IF EXISTS LocationCrimeNum;
DROP TABLE IF EXISTS CrimeNumDescription;

CREATE TABLE LocationCrimeNum (
	LAT REAL,
    LON REAL,
    Descriptions VARCHAR(255)
);

CREATE TABLE CrimeNumDescription(
	CrimeNumLow INT PRIMARY KEY,
    CrimeNumHigh INT,
    Descriptions VARCHAR(255)
);

INSERT INTO CrimeNumDescription
VALUES (0, 4, 'No Crime, Safe'),
(5, 9, 'Few Crime, Usually Safe'),
(10, 19, 'Some Crime, Should Be Safe'),
(20, 49, 'Middle Crime, Often Safe'),
(50, 99, 'More Criem, Not So Safe'),
(100, 499, 'Many Crime, Not Safe'),
(500, 10000, 'Much Crime, Very Unsafe');

INSERT INTO LocationCrimeNum
SELECT DISTINCT a.LAT, a.LON, cnd.Descriptions
	FROM (SELECT cr.LAT, cr.LON, COUNT(*) as Num
		FROM Crime_raw cr
        GROUP BY cr.LAT, cr.LON) a JOIN CrimeNumDescription cnd ON a.Num BETWEEN cnd.CrimeNumLow AND cnd.CrimeNumHigh;

SELECT * FROM LocationCrimeNum;

