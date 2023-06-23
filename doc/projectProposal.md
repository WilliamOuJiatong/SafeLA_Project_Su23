## Q1:

In this project, we store the Crime in Los Angeles Data from 2020 to Present and Rent Price in Los Angeles Data from 2016 to 2018 in the database.

1. The first data is from 


- Dataset link: https://usc.data.socrata.com/Los-Angeles/Rent-Price-LA-/4a97-v5tx

- License: Public Domain

- Data Provided by: American Community Survey, B25064

- Dataset Owner: Luis Alvarez Leon

- Column Name:
    - DR_NO: Division of Records Number: Official file number made up of a 2 digit year, area ID, and 5 digits

    - Date Rptd: MM/DD/YYYY

    - DATE OCC: MM/DD/YYYY

    - TIME OCC: In 24 hour military time.

    - AREA: The LAPD has 21 Community Police Stations referred to as Geographic Areas within the department. These Geographic Areas are sequentially numbered from 1-21.

    - AREA NAME: The 21 Geographic Areas or Patrol Divisions are also given a name designation that references a landmark or the surrounding community that it is responsible for. For example 77th Street Division is located at the intersection of South Broadway and 77th Street, serving neighborhoods in South Los Angeles.

    - Rpt Dist No: A four-digit code that represents a sub-area within a Geographic Area. All crime records reference the "RD" that it occurred in for statistical comparisons. Find LAPD Reporting Districts on the LA City GeoHub at http://geohub.lacity.org/datasets/c4f83909b81d4786aa8ba8a7

    - Part 1-2: Number

    - Crm Cd: Indicates the crime committed. (Same as Crime Code 1)

    - Crm Cd Desc: Defines the Crime Code provided.

    - Mocodes: Modus Operandi: Activities associated with the suspect in commission of the crime.

    - Vict Age: Two character numeric

    - Vict Sex: F - Female M - Male X - Unknown

    - Vict Descent: Descent Code: A - Other Asian B - Black C - Chinese D - Cambodian F - Filipino G - Guamanian H - Hispanic/Latin/Mexican I - American Indian/Alaskan Native J - Japanese K - Korean L - Laotian O - Other P - Pacific Islander S - Samoan U - Hawaiian V - Vietnamese W - White X - Unknown Z - Asian Indian

    - Premis Cd: The type of structure, vehicle, or location where the crime took place.

    - Premis Desc: Defines the Premise Code provided.

    - Weapon Used Cd: The type of weapon used in the crime.

    - Weapon Desc: Defines the Weapon Used Code provided.

    - Status: Status of the case. (IC is the default)

    - Status Desc: Defines the Status Code provided.

    - Crm Cd 1: Indicates the crime committed. Crime Code 1 is the primary and most serious one. Crime Code 2, 3, and 4 are respectively less serious offenses. Lower crime class numbers are more serious.

    - Crm Cd 2: May contain a code for an additional crime, less serious than Crime Code 1.

    - Crm Cd 3: May contain a code for an additional crime, less serious than Crime Code 1.

    - Crm Cd 4: May contain a code for an additional crime, less serious than Crime Code 1.

    - LOCATION: Street address of crime incident rounded to the nearest hundred block to maintain anonymity.

    - Cross Street: Cross Street of rounded Address

    - LAT: Latitude

    - LON: Longtitude

2. The second data is from 

- Dataset link: https://www.kaggle.com/datasets/susant4learning/crime-in-los-angeles-data-from-2020-to-present

- License: Public Domain

- Data Provided by: Los Angeles Police Department

- Dataset Owner: Susant_Achary

- Column Name:
    - Policy Area 	
    - Dataset 	
    - Variable 	
    - Year 	
    - Amount 	
    - Tract 	
    - Tract Number 	
    - Neighborhood 	
    - GEOID 	
    - Location
    - Row ID 	
    - Date 
## Q2 Basic Functions:
Our newly designed website allows users to search for suitable apartments or houses to rent in LA using customizable filters on the search page, which includes options such as price range, preferred location, and crime rate. After applying these filters, the website presents the user with a preview picture of the property, its name, monthly price, and associated crime rate. If a user takes an interest in a property, they can simply click the star icon located on the right side of that listing to add the property to their favorites folder.

Moreover, our website features an interactive rental map of LA, marking out various streets. This map visually represents both the price and crime rate of each street; the darker the color, the more expensive or dangerous the area.
## Q3 Functionality Improvement:
There are two key improvements in our project. The first is the collection and computation of the average rental price and crime rate for each street in LA. This is feasible because both the rental and criminal datasets have the necessary columns for calculation (price and location columns in the rental dataset, and Crm cd 1~4 and location columns in the criminal dataset). After calculations, the values will differ per street, allowing us to visually represent them on the map with varying colors (the higher the amount, the darker the color).

The second improvement involves two navigation options to the list of suitable apartments. Users can either browse the list through filters (including price range, crime rate, preferred location), or they can click on a street on the map to view a list of apartments located there. To execute this map-based navigation, the system will need to redirect to the browsing page and filter out data rows that contain the clicked street's name in their location column.

## Q4
Safe house in LA

## Q5 Project Summary:
Our project aims to develop a rental website that utilizes two datasets: Crime in Los Angeles Data from 2020 to Present and rent price data in Los Angeles. This website will provide users with recommendations for housing locations based on their desired rental price range, and crime rate indicators to assist users in evaluating the safety of the recommended areas.

## Q6 Description of Application:

Our project is a rental website designed to assist individuals in finding suitable housing in Los Angeles. The website utilizes two datasets: the Crime in Los Angeles Data and rent price data in Los Angeles. Users can enter their desired rental price, and based on this information, the website generates a graph illustrating recommendations for housing locations within their specified price range. To further address the safety problems associated with rental locations, our project integrates crime rate indicators obtained from the Crime in Los Angeles dataset that display the level of risk associated with each recommended housing location, allowing users to assess the safety of the areas they are considering.

In general, our website provides a platform that links rental price data with crime rate indicators. By merging these datasets, we aim to offer users valuable insights and recommendations for housing locations that incorporate their budget and safety preferences in Los Angeles.

## Q7:
Our application is useful for several reasons. Firstly, it bridges a gap between two significant factors that people consider when looking for rental properties - cost and safety. While there are many websites that provide rental listings, including information on price and location, few, if any, integrate crime data directly into their platforms. Our application takes an extra step by combining these two aspects to provide a holistic view of potential rental properties.

In the current digital marketplace, there are websites like Zillow, Trulia, and Apartments.com that give detailed descriptions of rental properties, including pricing and neighborhood characteristics. However, for crime rate information, users would typically need to visit other sites like AreaVibes or City-Data. This process can be time-consuming and confusing, as users have to compare data from different sources and may not always find compatible or updated data.

Our application differs by presenting all of this information in one place. By integrating crime data into our platform, we streamline the search process and help users make informed decisions about where they might want to live. The application also personalizes results based on the user's specified rental price range, which provides a tailored experience that isn't often found in traditional rental websites.

Furthermore, our use of visual aids like graphs and indicators enhances user-friendliness and accessibility of the data. By displaying this information in an easily digestible format, we aim to make it simple for our users to understand the connection between rental price and crime rates and how it impacts their potential living situations.

In summary, our application's usefulness stems from its ability to combine key rental decision-making factors in one platform and present the data in a user-friendly, personalized manner. This enables users to find suitable housing options in Los Angeles more efficiently and with greater confidence in their safety and budget considerations.
## Q8:


The data for this project consists of two datasets:

1. Rent Price in Los Angeles Data from 2016 to 2018: This dataset provides information about rent prices in Los Angeles. It includes variables such as DR_NO (Division of Records Number), Date Rptd (date reported), DATE OCC (date of occurrence), TIME OCC (time of occurrence), AREA (LAPD geographic area), AREA NAME (name of the geographic area), Rpt Dist No (reporting district number), Part 1-2 (crime category number), Crm Cd (crime code), Crm Cd Desc (crime code description), Mocodes (modus operandi or activities associated with the crime), Vict Age (age of the victim), Vict Sex (gender of the victim), Vict Descent (descent code of the victim), Premis Cd (premise code), Premis Desc (premise description), Weapon Used Cd (weapon used in the crime), Weapon Desc (weapon description), Status (status of the case), Status Desc (status description), Crm Cd 1 (primary crime code), Crm Cd 2-4 (additional crime codes, if applicable), LOCATION (street address of the crime incident), Cross Street (cross street of the incident), LAT (latitude), and LON (longitude).

2. Crime in Los Angeles Data from 2020 to Present: This dataset contains crime data from Los Angeles for the period from 2020 to the present. It includes information such as Policy Area, Dataset, Variable, Year, Amount, Tract, Tract Number, Neighborhood, GEOID, Location, Row ID, and Date.

The first dataset is obtained from the USC Spatial Sciences Institute and the American Community Survey, provided by Luis Alvarez Leon. The second dataset is sourced from the Los Angeles Police Department and is provided by Susant_Achary on Kaggle.

Both datasets are publicly available and fall under the public domain license.

## Q9 Functionality Description:

The website offers users the opportunity to register and log in for a personalized browsing experience. Once logged in, users can locate suitable rental lists through filters, or discover the price and crime rate of a specific apartment by typing its name in the search box. The interactive map also allows users to select a street and access the housing information specific to that street. When a user clicks the star icon beside a property listing, that property gets added to their favorites folder.

As for data storage and removal, we need to securely store user account information for log-in purposes, save the contents of their favorites folder, and establish a method for users to easily remove selected properties from their favorites folder.

## Q10


## Q11 Work distribution:

### Front End:

- User Interface (UI) Design: The creation of all visual elements of the website. This includes colors, shapes, fonts, images, animations, and the overall aesthetic of the website.

- Website Structure: This involves designing the layout and navigation of the website. You'll need to create pages for users to view available rentals, search for rentals, view favorites, and access their profile. This also includes creating the interactive map of Los Angeles.

- User Interaction: Designing the functionality and behavior of interactive elements. For example, creating the search function, filters for rental listings, and the ability for users to favorite and unfavorite properties.

- Responsive Design: Ensuring the website looks good and functions well on various devices, such as desktops, laptops, tablets, and smartphones.

- Data Visualization: Displaying crime rates and rental prices on the map and in listings in a way that is easy for users to understand.

### Back End:


- Server-Side Logic: This involves creating the logic to process user requests such as searching for rentals, filtering rental listings, favoriting properties, and viewing favorites.

- Database Management: The Back End will have to manage a database containing all rental listings and their associated information (price, location, etc.), crime data for each location, and user information (usernames, passwords, favorite listings).

- (Yuqin Jian) User Authentication: Creating secure login and registration systems for users. This involves securely storing user data and ensuring only authorized users can access certain features (like the favorites folder).

- Data Processing: Calculating average rental prices and crime rates for each street. This will require aggregating data from the rental and crime datasets.

- (Yuqin Jian) APIs and Integration: The Back End may need to integrate APIs to display the map, and potentially other services. The team will need to handle requests and responses between the server and these third-party services.

- Security: Ensuring all user data is securely stored and transmitted. This includes protecting against threats like SQL Injection and Cross-Site Scripting (XSS).