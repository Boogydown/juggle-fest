juggle-fest
===========

This is my code submission to Yodle to solve their Juggle Fest puzzle as part of a job application.

It is fully unit-tested, with a brute-force solution and then a smarter solution with some optimizations (I wrote brute, first, In honor of Knuth, "premature optimization is the root of all evil").  Wanted to do this in python but haven't had the opportunity to dig really deep in to python classes, yet.  Meanwhile, it's in Javascript.  I used the Jasmine testing suite to spec it out in a BDD approach (just run spec/SpecRunner.html to see all tests; refresh if it gives you "undefined" errors, as Jasmine and Requirejs don't play together well).  I am also using jQuery.ajax to pull in the data file so you may want to run it in FF or IE, where you won't get the XSS restrictions that Chrome gives you.  And yes, I'm using Requirejs for my AMD code structure.


Juggle Fest - Problem.txt : contains the initial problem as posted by Yodle
Juggle Fest - Solution Notes.docs : contains my own person solution notes, including big-theta calculations
