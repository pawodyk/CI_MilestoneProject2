# Milestone Project 2 

**By Pawel Wodyk**

<hr>

***GetIT*** is interactive jobsearch Single-Page Application for IT professionals located in UK. It allowes you to search for the current job opportunities using the job title or location. Once the job ads are acquired from Adzuna API you can view their location on the interactive map and read more details about them in the cards provided bellow the map. 

The main aim for the site is to provide clear and readable interface with minimal interuptions and unnecesary features, that will help to speed up the process of finding the best suited job. 

Note: the site displays max 48 results per api call because of <a href="#APILimit">API limitations</a>

### Status: [DEPLOYED on *GitHub Pages*](https://pwodyk.github.io/CI_MilestoneProject2/)

## UX

```md
Use this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.
```

This Single-Page Application was design with the simplictity and transparency in mind. I wanted to make an interface as minimal and unobtrusive as posiblle, while allowing the user interaction with the map as a main feature, I decided that the map will be helpful feature that will help to visualize the jobsearch.

The search itself was designed to be very simple with very little customization by the user. While the Adzuna API provides a lot of customization of the API call I decided to hardcode most of the variables. 

- *it search only for jobs taged as IT jobs* - the site is catared to Developers and IT proffesionals hence it will only display this type of jobs, makes it clearer by not displaying other jobs that use the key word in other proffesions eg. job ad for barista could also have *java* keyword which could cause annoyment and make it less readable.

- *the search results are caped to 15 days old and displayed in the newest to oldest order* - this is based on my own experience. I decided that the most recent jobs are the most likly to be still available hence the data is displayed in the order of newest first, and at most 15 days old (2 weeks + 1 day) which should be enough for most jobsearches.

- *the search looks for positions within 30km of the location specified* - this is to show the user all the available position within resonable distance of their search location.

<span id="APILimit">Unfortunatlly the API allowes for maximum of 50 results per API call. Hence for a better readability I decided to request 48 job ads per API request. </span> This number was derived from the biggest common denominator of 2 and 3 since the job cards are displayed in the rows of 3 on desktop, rows of 2 on tablets and single card per row on mobile. To help with readability the jobs are displayed in the intervals of six jobs or in case of selecting the job from pin/clusters on the map, all the jobs that were clicked will be displayed, with the option to display all jobs.

### Responsive Design

The app is responsive and has full functionality on all common resolutions used on smartphones, tablets and desktops. 

The site utilize the bootstrap to scale all the panels to provide clear and confortable viewing on different display sizes. The number of cards that is displayed in each row is dependent on the screen size and is as follows:
    
 - Large screens (desktops/laptops): 3 cards per row,
 - Medium screens (Tablets): 2 cards per row,
 - Small screens (smartphones and small Tablets): 1 card per row 
 - Extra Small screens (smarthones with display less then 576 px wide) 1 card per row, with scallable card height

The ads have set height on resolutions over 576px wide to look better in the card format but on smartphones each card is automatically scaled to it's content size to prevent scrolling through blank space beteen description and apply button. Which could be very discorageing on smartphones. Also the job details are automaticaly aligned vertically instead of two columns to help with readability on the small screen.

The description is truncated to 400 characters to look better and to not overwhelm the user with too much informations.

Back to the top button is situated on the bottom to help user quicklly return to the search.

### User stories

Project was designed with following Users in mind:

1. I want to see what ads were posted today for my proffesion (eg. Frontend Developer)
    - allowes searching the jobs by position keywords, display them sorted by date. 
    - Each job offer is listed with the most important information and is clearlly visible in the rows.
    - Apply button underneth each job card allowes user to apply for a job.

2. I want to see all recent ads in UK and see where the positions are located
    - the search allowes for the "blank search" for all IT postions in all of UK
    - the map provides quick glance at the postions and their locations.
    - the map is iteractive and allowes the user to click on each pin/cluster to display only those jobs and their details

3. I want to quickly find all job listings from last two weeks in my city (eg. Belfast)
    - User can search for a specific location (eg. town name) or more general location (eg. counties or region)
    - The map will focus on the clusters once the clusters are displayed
    - user can then click on the specific pin/cluster on the map to display only jobs in that place.



### UX Design Documentation:

- [Wireframe](https://app.moqups.com/ZUHYlPuYAk/view/page/a21d223ab)
- [Flowchart](https://app.moqups.com/ZUHYlPuYAk/view/page/a9b455ff1)
- [Functions Dependency Map](https://app.moqups.com/ZUHYlPuYAk/view/page/ad64222d5)

<a href="./UX Design Backup/">backup link</a>

## Features

### Existing Features

- **Feature 1** - The Input boxes allowes user to enter position keyword and/or location. Both are optional for more generic searches like "*All positions in **London***" or "*All **javascript front-end** positions in UK*".

- **Feature 2** - The Job offers display as a cards which allowes users to view each job details in clear and readable manner. The job title is the clearlly visible at the top and the job details are visible underneath the job title and they include:
    - Company name
    - Location
    - Salary
    - How old is the ad 
    
    The Details will be truncated if they are too long but each detail displayed has the full name showing on hover.

- **Feature 3** - The apply button under each job offer allowes the user to apply for the postion and it is clearlly visible under each job listing.

- **Feature 4** - Once the jobs are received they are displayed on the map so user can see their location

- **Feature 5** - The map is interactive and allowes the user to select the jobs in the specific location by clicking them on the map. Which will display only selected job cards. It also creates button to display all jobs again at the top of the job list and at the bottom for better user interaction.

- **Feature 6** - Once the Pin or Pin Cluster is clicked on the map the message under the map will be displayed with the selected location. If the Pin Cluster has jobs from more then one location it shows Multiple locations selected.

- **Feature 7** - The map will focus on the clusters once they are added to the map for the better user experience. 

- **Feature 8** - Responsive design - the site is scalable and respond to the different device sizes.

- **Feature 9** - The jobs are display in intervals of 6 for better presentation and readability. User can then press on **more** button to display next 6 jobs. Once all the jobs acquired from the API are displayed The button will change to *request next 48 jobs from the server*. At this point user can also go back to the top pressing the button **Back to the top** that is also always visible at the bottom of the page in the footer.

- **Feature 10** - The job list is saved in the local array and all the operations are done on the array until the user request another page from API. This saves on the internet usage and lowers API calls.

### Features Left to Implement

The API supports following country codes: `// gb au at br ca de fr in it nl nz pl ru sg us za` - which could be added in the future as an option to search for jobs in the different countries.

This feature however will cause the need to implement timezone for different locations and customize the currency and posibly the language. 

I decided that this would make the site less readable and the better solution would be - if needed in the future - to just make different sites for a different countries.

[ADDED AFTER TESTING] 

Add the coordinates value to the results received from API without them the possible solution would have to be not very resourece hungry and preferably do not involve API calls since acquiring 20+ results from API could slow down displaying of data and might affect user experience.

## Technologies Used

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) 
    - This website uses **HTML5**.

 - [SASS/SCSS](https://sass-lang.com/) & 
    [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3)
    - **SCSS** was used for custom styling of some element that could not be styled by using bootstrap, and was compiled to **CSS3**. However most of the web styling and design was done with bootstrap.

- [Bootstrap 4.3.1](https://getbootstrap.com/docs/4.3/)
    - I used the **Bootstap framework** for desigining the page layout and implementing flex desing elements. 
    - I also used predefined bootstrap styles to customize elements on the page, ie. buttons, cards, footer etc.

- [Font Awesome Icons](https://fontawesome.com/)
    - I used **FA icons** mostlly for icons displaying in the details section of the job card. Clear and colorfull icons looks better then the label like comany name or location as well as save space. 
    - Also used for up arrow icon in the back to the top button.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    - **JavaScript** used for API request and providing fuctionality to the website. In tandem with JQuery to modify the html document. 

- [JQuery](https://api.jquery.com/)
    - I utilize **JQuery** queries to help me modify the html document. I used it to inject html elements to the document, modify the classes on the fly, and to remove some elements to prevent duplication.



## Testing

<div style="text-align: center; font-weight:bold;">Note: The tesing has been done manually to preserve api calls.</div>

The Testing was done Manually and was divided into 4 Testing Groups
    
    1. Searching and API calls
    2. Map
    3. User Interface
    4. Responsive Design

## Testing Process

1. Testing searching and API calls 
    - &#9745; Test 1 - search with single word position name only 
        1. Entered *javascript* into search input box
        2. Pressed **Find IT!** button
            - Search displayed 6 job cards
            - 48 results received
            - Map was rendered correctlly with the pins all over UK
        3. Entered *full stack developer*
        4. Pressed **ENTER** key 
            - Search returned 6 job cards
            - 48 results received
            - Map rendered correctlly
            - Search results included all the keywords in either title or description. Results also included *Full-Stack Developer*

    - &#9745; Test 2 - search with location only 
        1. Entered *London*
        2. Pressed **Find IT!** button
            - Search diplayed 6 job cards
            - 48 results received
            - Displayed jobs in london and area.
        3. Entered *Scotland*
        4. Pressed **ENTER** key 
            - Search diplayed 6 job cards
            - 48 results received
            - Displays jobs in correct location.

    - &#9745; Test 3 - searching with position and location
        1. Entered "backend developer" in position
        2. Entered "Scotland" 
        3. Pressed **ENTER** key 
            - Search displayed 6 job cards
            - Only 9 results reveived from API
            - Displayed correctlly on the map
        4. Entered "Java" in Position
        5. Entered "London" in Place
        6. Pressed **ENTER** key 
            - 48 results received - 6 displayed initialy in cards
            - Map renders correctlly

    - &#9745; Test 4 - empty search no parameters
        1. Removed all data from Job and Place input boxes
        2. Clicked **Find IT!** button
            - **ENTER** key only works when the pointer is in the input box since the event is set on .input element
            - Jobs are displayed correctlly

    - &#9745; Test 5 - searching for unrecognised keyword
        1. Entered *qwertyuiop* in Job input box
        2. Clicked **Find IT!** button
            - message "*!!! No Jobs Found...*" is displayed under the map as expected
            - no pins or job cards were displayed
        

2. Testing pins and clusters diplaying on the map
    
    - &#9745; Test 1 - Test Map rendering and focusing on the pins/clusters
        - Previous test of different searches proves the map renders correctlly and focus on correct location as expected

    - &#9746; Test 2 - Checking the number of pins/clusters displayed 
        1. Entered *javascript* into Job search box and *London* into Location
        2. Pressed **Enter**
            - 48 results received but Map renders as expected but with only 24 pins
            - Console logs 24 invalid coordinates which correctlly adds up to the number of jobs received
            - On further inspection some jobs in the returned array do not have parameter for *longitude* and *latitude*, this indicated that the coordinates are not manditory and API do not return them every time. they have a location in string format though.
            - This could be improved in the future by asigning default location to the jobs that don't have it, or alternativelly write the code to Bing REST API requesting coordinates for their position.

    - &#9745; Test 3 - Clicking on the Pins
        1. Entered *Javascript* in the job search box, location left blank
        2. Pressed **Enter**
            - 34 pins renders as expected
            - 14 pins missing coordinates
            - Map focus correctlly on the pins
        3. Pressed on the cluster of 7 pins around London Area
            - Message "*Displaying jobs in : Multiple Locations*" is displayed correctlly
            - 7 job cards are displayed under the map as expected
        4. Zoomed in to Menchester as close as possible
        5. Pressed on the 4 pins in a cluser over Menchester city
            - *Displaying jobs in : Manchester* appears under the map as expected
        6. Zoomed out slightly until some other single pin was visible
        7. Pressed on the single blue pin over Liverpool 
            - Message displayed: *Displaying jobs in : Liverpool*
        8. Pressed on **Display All** button
            - all 48 jobs were displayed again

3. Testing User Interface 
    - &#9745; Test 1 - Testing **Main Search** button and Event on pressing Enter in the input fields
        - This test was proved sucessfull by the previous tests. Both button and pressing **Enter**, correctlly calls acquireResponse function which then gets data from the server as expected.

    - &#9745; Test 2 - Testing **More** Button 
        1. Entered *Javascript* in the job search box, location left blank
        2. Pressed **Enter**
            - Search displayed initial 6 job cards
            - 48 results received
            - pins are rendered on the map
        3. Pressing **MORE!** button underneeth the job cards
            - next 6 jobs displayed as expected
        4. Pressed **MORE!** button 6 more times until it has changed to **Request next 48 jobs from the server**

    - &#9746; Test 3 Testing **Request next 48 jobs from the server** Button
        1. Steps Carried on from the previous *Test 2 - Testing **More** Button*
        2. Pressed on **Request next 48 jobs from the server** Button
            - The site did not collapse correctlly leaving me at the bottom of the page and displaying white background.
        3. Scrolled back up
            - The site displayed the new search results but the white background was still present and some items were not aligning corectlly.
        4. I refresed the page and repeated the steps
            - The page renders correctlly this time and takes me back to the top on pressing the **Request next 48 jobs from the server** Button.
            - I repeated the steps 2 times but was unable to replicate the error. It could have been a browser error.
        5. Resuming the test
        6. Requested new data with the search keyword *Python*
        7. Pressed **More!** Button 7 times
            - Button changed to **Request next 48 jobs from the server**
        8. Pressing **Request next 48 jobs from the server**
            - Next page was rendered with another 6 results
            - Map pushpins have changed
            - new 48 results were returned

    - &#9745; Test 4 - Testing *Show All* Button displayed when clicked on the cluster or pushpin
        1. Entered *Software Developer* in the job search box, location: *Northern Ireland*
        2. Pressed Single Pin Titles *Derry Software Tester*
            -  Message displayed: *Displaying jobs in : Derry*
            - Button **Display All** added to the top and bottom
        3. Clicked on the **Display All** Button at the top
            - all 48 jobs displayed
            - message between job-list and map was hidden as expected
        4. Clicked on the cluster of 32 pins over Belfast
            - *Displaying jobs in : Belfast* displayed
            - 32 jobs displayed all with location *Belfast, Northern Ireland*
        5. Clicked on the **Display All** Button at the bottom
            - all 48 jobs were displayed
            - the button at the bottom was changed to **Request next 48 jobs from the server**
        
    - &#9745; Test 5 - Tested **Request next 48 jobs from the server** Button after pin was pressed and after display all button was pressed to display all the results to see will it display correct values
        1. Continuing from the previous test
        2. Pressing the **Request next 48 jobs from the server** Button
            - New request was sent to the server and new 48 Software Developer jobs in Northern Ireland were returned
            - 6 jobs displayed in cards
            - pins have been changed and map rendered correctlly
            - button was changed back to More!!

    - &#9745; Test 6 - Testing the **Back to the top** Button
        1. scrolled to the bottom of the screen
        2. pressed the button "Back to the top"
            - As expected takes me back to the top

4. Testing Responsive design 
    
    Each test preformed for each [Bootsrtap responsive breakpoints](https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints)

        staring resolution set to 320x568 since its a resolution of iPhone 5 one of the most common phones in US hence was chosen as a minimal tested resolution

    - Test 1 - Initial site - when the site loads
        1. Reloaded Page
        2. Changed resolution to 320x568
            - Title and Search box scales correctlly and respond to the display width button is moved to under the input boxes and displayed correctlly
            - the only minor issue is that the footer is only partially visible on smaller resolutions, possible improvement
        3. Expanding the resolution
            - all the elements respond correctlly to the expanding resolution
    - Test 2 - After Requesting the jobs from the server
        1. Changed the resolution to 320x568
        2. Searched for Java Jobs in Wales
        3. Scrolled downto the bottom
            - job cards scale correctlly and placed in the single column
            - job details are stacked in the single column as expected
        4. Repeated steps 1 to 3 for other resolutions
            - everything is scaling as expected 
            - the number of jobs per row changes pre resolution and each element is scallable
            - no problems with usability on smaller screens

### Testing Conclusion

The site has mainly hehaved as expected throaugh all tests, with one exception on pressing the button responsible for requesting more jobs in Step 3 of "*Test 3 Testing **Request next 48 jobs from the server** Button*". I have tested the same scennaraio 3 more times on the chrome browser and 1 more time in the FireFox but I was unable to reproduce the bug.

Other issue with some jobs returned from API do not have *lang* and *long* variables. I was aware of this issue during development, and was mitigated by inserting the check for numeric values before they are added as a coordinated. 

Possible solution could be requesting the location everytime the job do not have correct coordinates however this would put a lot of strain on the API calls and potentially might slow down the rendering of the pins. Therefore without future testing it cannot be added to the application at this point. This feature was added to **Features Left to Implement** section of this document.

## Deployment

The Website was deployed on GitHub Pages from the Master Branch.

The link to the deployed website: https://pwodyk.github.io/CI_MilestoneProject2/

## Resources and Credits

### Content

* all the information used in the job listings are acquired via API from [Adzuna UK](https://www.adzuna.co.uk/).

### API

* [Bing Maps API](https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api)
    - used to display jobs' locations on the map
* [Adzuna API](https://developer.adzuna.com/)
    - used to get job listing information:
        - Ad's ID
        - Position Title
        - Company name
        - Location
        - Latitude / Longitude
        - Salary (min/max)
        - Time of Posting
        - Description Snippet
        - Link to the ad

### Images

* [Loading Gif](http://www.mytreedb.com/view_blog/a-33-high_quality_ajax_loader_images.html)
    - Source: http://www.mytreedb.com
* [Photo by rawpixel from Unsplash](https://unsplash.com/photos/cnseVhmbA7k)
    - Author: [@rawpixel](https://unsplash.com/@rawpixel)
    - Licence: https://unsplash.com/license
* [Adzuna Logo](https://www.adzuna.co.uk/press.html)
* [Bing maps Logo](https://www.microsoft.com/en-us/maps/mobile-brand-guidelines)

### Guides / Instructions / Code Samples

I used following code snipets from Bing Maps Documentation in my project:

* [Customizing Clustered Pushpins](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/clustering-module-examples/customizing-clustered-pushpins)
* [Zoom into Clusters](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/clustering-module-examples/zoom-into-clusters)
* [Pushpin Clustering in Bing Maps V8](https://blogs.bing.com/maps/May-2016-(1)/Pushpin-Clustering-in-Bing-Maps-V8)