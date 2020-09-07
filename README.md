# DjangoReact
This a project where Django is used as back-end with React as front-end.

## Post Note

This a post notes project where 


* Unanthenticated users and unauthorized users can only see posts
* Only authenticated users and those who are content creators can create posts
* A user can:
  * Login/Logout
  * Register
  * Pay a membership to become a content creator
  * Like posts (needs to be authenticated)
* Interface actions:
  * watch/create/delete/update/like posts
  * display posts statistics:
    * likes
    * words
    * histogram of the words





### Data validation
The validation for the fields that will be stored at the database can performed at different levels:

+ Server side, API: with django rest framework
+ Server side, Database: with constraints or triggers
+ Client side: with javascript

