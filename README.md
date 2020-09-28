# Electric Vehicles Project
## Team Name: Returning Kangaroos
 
<img src="https://ih1.redbubble.net/image.191575280.8841/st,small,845x845-pad,1000x1000,f8f8f8.u3.jpg"
     alt="kangaroos"
     style="float: left" width='200' height='200'/>


## Objective:

The purpose of this project is to create a website with a map displaying all the available electric vehicle charging stations in the United States and provide users with ample amount of information on each of the stations. In addition, the website displays electric vehicle incentives and programs at the national and state level. The maps created using html/JavaScrips allow users to interactively play around with the map and find useful data on each of the stations or state. We also provide useful statistics information on EV charging stations related to their geographical locations, government subsidies for each states, and other general information that may be relevant to the users if they decide to purchase EV cars.


## Libraries / Requirements:
* BeautifulSoup
* pymongo
* splinter import Browser
* Pandas
* D3
* Requests
* JSON
* JavaScript
* CSS
* HTML


## Data Sources:

* https://developer.nrel.gov/api/ (csv)
* https://api.openchargemap.io/ (json)


## Database:

* MongoDB


## Visualization:
### Map 1
This map represents 29,777 Electric Vehicle charging stations that was available from openchargemap api. The Leaflet library used was marker cluster group library, which helps map out every locations without causing memory issue.

### Radial Stacked Bar Chart (D3)
We explored a new D3 graph and used data from openchargemap. The graph shows number of charging stations per state in different ranks. The color in the graph represents different ranks.

### Incentive Programs
The map shows the number of incentives by the states in the United States.
It is interactive to show the number for each type of incentive and its description as cursor is used on the map. Also, it is color coded to compare the difference among the states.

<img src="https://i.pinimg.com/originals/18/8c/a7/188ca7f03d2282765b57fb602f1a7235.jpg"
     alt="kangaroos"
     style="float: left" width='140' height='200'/>


