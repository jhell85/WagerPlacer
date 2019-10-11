# Wager Placer

Create a web application that lets users sign up and create a profile where they can wager a bet with another user of the site. Using an API to bring in sports data to determine the outcome of bets and set odds for the bets. The user will have the option to have different bet parameters such as a single team to win or having multiple teams needed to satisfy a winning bet(parlay bet). using the API data I'll be able to tell when all parameters of a bet have been completed and then send an email notification to all people involved in the bet to the results of the bet 

## Project Over View
1. User interface and database 
   - Bets user is actively involved in
   - History of all bets user has been involved in
2. Bets
 - Parameters of bet
   - single parameter bet to determine winner 
   - multiple parameter bet to determine winner, as the parameters change the odds change to match 
   - pool style bets *ex: more then one user in the bet*
     - bracket pools *ex: NCAA march madness bracket* 
     - other pools *ex: Super Bowl squares pool*
   - unofficial bet that only the users would be able to determine the results of the bet in this style bet the user would give the odds parameters and amount of the bet to the app. after those are given the users will have to let the app know what was the results of the bet to determine a winner.   
3. Data of scores and odds brought in with API  
   - Update the bets users can bet on based on what games have already been played and removing them or making them no longer able to bet on, adding to the bets users can select based on games that haven't been played yet.
 
## Functionality
From the users view they will log in have a link that will state "active bets" and that will take them to a page that has all the bets that are open that they are involved in,and another link that will take them to a page where they can place a bet.

## Data Model
1. Users
   - User's basic info 
   - Open bets the user is involved in
   - Finished bets the user was involved in and the results of the bet
2. Bets
   - Parameters of bet to determine what makes a winning bet
   - Odds of the bet to determine how much was risked and how much to win
## Schedule
### Time line goals
1. Able to finish by Capstone presentation
   - Users- established with ability to create new users and have a section for all the functions of a user outlined in Data model's section
   - Bets- establish ability to place bets with other users 
   - Scores & Data - use an API to bring in the scores and results of sport events to determine who will be the winner of a bet.
2. Possible to finish by Capstone presentation
   - Odds- give the user ability to bet on sporting events with odds brought in with an API to factor into the pay out as opposed to just 1:1 odds
3. Functionality to work on past the capstone presentation 
   - pool style bets
   - abilities to bet on more then just sports outcomes *ex: award show nominations and winners*
