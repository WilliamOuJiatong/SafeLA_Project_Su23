USE proj_rent_crime;
SET @UserLat = 34.03;
SET @UserLon = -118.15;

SELECT @UserLat, @UserLon;

SELECT r.Row_ID, r.Amount, r.Tract, r.Year,
       SQRT(POW(r.LAT - @UserLat, 2) + POW(r.LON - @UserLon, 2)) AS Distance,
       a.AverageAmount
FROM Rent_raw r
JOIN (
    SELECT Tract, AVG(Amount) AS AverageAmount
    FROM Rent_raw
    GROUP BY Tract
) a ON r.Tract = a.Tract
ORDER BY Distance ASC, r.Amount ASC;