# Final Project Report-Group3

### [Video Link] (https://youtu.be/Fhx7WVZT7jA)

#### 1.Please list out changes in directions of your project if the final project is different from your original proposal (based on your stage 1 proposal submission).

Compared with the stage 1 project proposal, our program successfully accomplished the functions listed on the proposal. 1. calculating the crime rate of a location; 2. find the nearby housing with its information; 3. keyword searching of a location. But failed to 1. calculate the average price of houses near a location. 2. achieve the visualization of price/crime rate on map. 3. provide a real-time photo display of the location selected.

#### 2.Discuss what you think your application achieved or failed to achieve regarding its usefulness.

As for the application of collection and computation of average rental price and average crime rate in LA, it achieved the estimation of the safety of a location, the surrounding housing, and its price. It is useful when someone want to seek a location with affordable rent in a safe place. But it failed to search the location with the filter of expected price or the expected crime rate, which would cost users more time of clicking and searching the location to find the appropriate housing. Another thing it failed to do is mentioned in question 1, which is the direct visualization of the price/crime relationship on the map of our program. We realized this functionality by listing the information at the bottom corners of the web page. 

#### 3.Discuss if you changed the schema or source of the data for your application

We didn’t change the schema and source of this application for finding safe and affordable housing. We stored the un-modified source data in table Crime and Rent. But as for our SQL database, we’ve created table user for storing the registered UserID, email and password for confirming the users, a table Subscription for collecting the locations in favorite folder to avoid clicking the near/same location in same favorite folder, a table favorites to collect the rent information of the housing selected by user, and a table location crime number for storing the corresponding crime rate of a location. We’ve also created tables for storing the information and accomplishing the SQL query to achieve advanced function.

#### 4.Discuss what you change to your ER diagram and/or your table implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design? 

As for the ER diagram, we’ve kept all the tables and relations in ER diagram, and also created some tables. Here are the tables we created: 1. favorites [UserID, Tract, Year, Amount, RateNum] to store the housing information user selected and its corresponding crime rate. 2. Subscription [UserID, LAT, LON] to store the location of each selected housing in favorite folder and to avoid user from setting two housing with too near location. We add these tables into our ER diagram because we have to set the favorite folder in this project and enable users to select places, where those tables are necessary. This design is more suitable as it accomplished the favorite folder storage and avoided the possible redundancy of it.

#### 5.Discuss what functionalities you added or removed. Why?
We added a function that users can easily change their email address or password. Also, they can delete their account whenever they want. This additional web page enables users to change their account more flexible, which is a critical feature we added. Another functionality we added is to mark a selected location on the map with a flag so that the user can go back to the position quickly. We removed the feature of displaying the rent price information or the crime rate information directly on the map (which we initially planned to mark on the map with different colors). After we completed our main web page, we found that displaying this information on the map will disturb the user interface unity, and we decided to abandon this functionality.

#### 6.Explain how you think your advanced database programs complement your application.

The advanced database programs complement our application by simplifying the interactions between the frontend Node.js web program and the backend database application. We do most of the calculations at the backend and only send the outputs to the frontend, where the information is displayed. For example, when calculating the distance between two locations, one currently selected by the user and the other being those that the user has saved before, the stored procedure helped to do the query, calculation, and output, which is more convenient and of higher efficiency. On the other hand, the triggers defined also helped to simplify the frontend workload. As a result, the advanced database programs improve our application performance.

#### 7.Each team member should describe one technical challenge that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project. 

#### Yuqing Jian
When deploying the application on the GCP, need use nvm to use node js 16. Don't forget to update the apt-get to ensure other functions. Close or change the firewall to make external visit work. If you find it hard to upload file to the VM instance, check the secret key, upload your computer's public key.

#### Jiatong Ou
One technical challenge I encountered was the viability of connecting to the remote online GCP backend. Because of the special requirements of the ip connection design on GCP, when you are moving to a new network environment, you have to add that new ip address to the server permission before you can start your development at the new place. It is important especially when you are in a period of transportation or are moving between different places. Another related little problem happens to me every time when I finish my work on MySQL workbench and want to quit the program. Because I’m using mac, when I force-quit the workbench, there is always a caution that jumped out to me. Please note that this may be due to some niche compatibility of the program in a MacOS environment. Just close the pop-up window.

#### Junhong Ye
I have to point out that we should click the “Apply” everytime we update the SQL database in the MySQL workbench. Without clicking this button, every modification of the database can’t be tested and verified. 

#### Yuese Yu
As the main front-end developer, I admit that my responsive design is not particularly good. The entire page has different effects on screens with different resolutions due to some cumbersome designs added in the early stages and unorganized syntax. This has made the page look unattractive. I need to design and then modify the code, and continue to refine my front-end skills. Also, learning how to create my own branch and merge on GitHub is something I need to learn—I usually use GitHub's online editor, but this might lead to some errors.

#### 8.Are there other things that changed comparing the final application with the original proposal?

The final application of the project almost matches all requirements of our previous proposal, except visualizing it on the map (have said “the darker the color, the more expensive or dangerous the area” in project proposal.) Because the boundary of “area” is hard to define, it could be a block, a road, or a district. We gave up visualizing the price/crime rate on the map. Instead, we showed the Amount (monthly rent of a tract) and the crime rate (Descriptions link “No crime, save”) in the home page. Combining the two sections almost perfectly substitute the original initiation in terms of functionality and the ease of realization.

#### 9.Describe future work that you think, other than the interface, that the application can improve on.

For using this project to fulfill the CV we might use in the future, we can add the corresponding picture/view of each tract, rather than just showing the text of rentInfo. (Could add SERP API for displaying the images from google image search). In addition, we could upload the crime map/price map onto the search location map in home page to alert users before they click the location. Another aspect of potential improvement is that we can try to merge more data from other data sources, so that the results would be more general and suggestive.

#### 10.Describe the final division of labor and how well you managed teamwork

We think our team works well. Yuqing Jian pointed out the idea of this project (getting the rent info of a location in LA with its crime rate), designed the database interaction, built the SQL database on GCP, built the framework of frontend and backend, and deployed this project on GCP, which is time-costive and hard. Jiatong Ou and Junhong Ye designed the query for getting crime rate, getting rent info of specific location respectively, and applied those function in frontend and backend. In specific, Jiatong Ou designed the advanced query with storing procedure and trigger of AddSubscription, which could stop user from adding the rentinfo in favorite folder if theres a building in near location. He also helped the UI design of the program and the development of the profile page for account modification. Junhong Ye built the button in rent info to add/remove that row of rent info in favorite folder, and designed the my favorites page (Each row have rent info and corresponding button for removing it from folder).Yuese Yu devoted himself on optimizing the visualization of the page (added video/image in the background, modified the interaction interface with user, etc.) designed the showcase procedure, and recorded the demo video, really making the webpage looks attractive. In this whole semester, we built this project step by step, meet by meet. Without anyone of us, this project can not be accomplished like this, a level that we could be proud of and can be added into CV.
