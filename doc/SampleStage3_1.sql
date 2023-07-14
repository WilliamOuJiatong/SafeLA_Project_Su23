SET @myLAT = 33.73;
SET @myLON = -118.30;

SELECT @myLAT, @myLON;

SELECT LAT - @myLAT, LON - @myLON
FROM Rent;

SELECT * FROM Rent_raw;

CREATE TABLE nearLocations(
	LAT REAL,
    LON REAL
);

SELECT lf.UserID, AVG(l.RateNum) as avgCrimeRate
FROM LocationFavourite lf JOIN Location l ON lf.LAT = l.LAT AND lf.LON = l.LON
WHERE (l.LAT, l.LON) IN (SELECT LAT, LON
	FROM Crime_raw c
    WHERE c.Vict_Sex = 'M')
GROUP BY lf.UserID
ORDER BY avgCrimeRate;