#README

##diveloggr Basics

**diveloggr** is intended to be an online platform for users to log their scuba dives.  The platform at this time is mostly a proof-of-concept.  Over the course of developing diveloggr, I have received input from many of my dive buddies on what would be useful in terms of features, and I have plans for revisiting this project and overhauling it extensively to incorporate these recommendations.

The power of diveloggr comes from user data.  Users' logged dives contain time-based data on conditions and environmental trends which can be aggregated and formed into useful summaries which are of interest to the diving community.  Simple statistics can be performed to indicate the trending conditions of a dive locale or region.  An additional feature which may be coming soon is the ability to tag wildlife sightings to a post (and thus a location) to allow diveloggr to show users where the good things are.

The stripped down version which I have plans for will be entirely mobile-friendly.  Since envinronmental conditions are entirely time-sensitive, I want users to be able to log data as soon as they get out of the water.  In addition to making the site mobile oriented, some of the unnecessary features will be stripped out and emphasis will be given to the data that truly matters: entry conditions (i.e. surf and swell), water temp, and visibility (water clarity).  The ability to upload photos from dives may be retained, but is not as important from a data aggreataion standpoint.

Additionally, a new Location model will be implemented.  Since dive sites are generally well-established locations, it makes sense to allow users to associate an entry with an established dive site.  This will also allow for better data clarity.

###diveloggr Implementation

diveloggr is based on these technologies:

*[Ruby on Rails](http://rubyonrails.org/): Convention over configuration.  RoR is an open-source web framework written in Ruby.  Follows MVC architecture.  Rails is used in diveloggr on the backend to serve a RESTful JSON api to the clientside.  Diveloggr uses Rail's ORM layer (ActiveRecord) for basic CRUD interactions with its PostgreSQL DB.

*[Backbone.js](http://backbonejs.org/):  Backbone is a JS library which brings MVC architecture to the clientside.  Models and collections communicate with the JSON API.  Clientside views are rendered asynchronously and then updated when ajax requests to the backend are completed and parsed.

*[Google Maps V3](https://developers.google.com/maps/documentation/javascript/):  Google Maps is used in diveloggr to map and select dive locations.  Diveloggr uses the API to filter entries based on the current bounds of the map window.

*[Filepicker API](https://www.filepicker.io/):  Diveloggr uses the Filepicker's RESTful API to allow users to upload profile pictures and photos of their dives.  Multiple callbacks are implemented upon an upload to create small, medium, and large versions of an image.  All images are then pushed to diveloggrs AWS S3 bucket and the database is updated with relevant URLs.

*Other Libraries/Gems: jQuery, Figaro (gem), Whenever (gem), Bootstrap

###Cool Features

***Zooming:** The feedview is filtered based on the location and zoom-level of the Google Maps window.

***Guest Accounts:**  A user may signup for a trial of diveloggr without becoming a full member.  They are identified by their session.  If they do not transition to a full member within a specified period of time, all entries they've created and their account are removed from the database via a cron job which is scheduled twice a day.

###Contact

If you have questions, comments, etc., contact me [here](mailto:john.ochs@gmail.com).  Bugs, issues, and feature ideas may be submitted [here](https://github.com/johnochs/diveloggr/issues).