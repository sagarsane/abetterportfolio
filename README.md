Initializing the project
========================


Idea discussed here: https://github.com/h5bp/lazyweb-requests/issues/86
A better portfolio - For Developers/Programmers. (Current, a prototype for web application for my own portfolio. Will extend it to a framework once basic setup is done!)

The aim of the project
-----------------------
- Build a portfolio tailored for a developer (a personal project at first)
- Eventually, the idea is to have a framework setup for creating/customizing portfolios specifically tailored for
developers/programmers.

*Currently, I am working on this project as a Portfolio for myself. I am using all the libraries and AppEngine mentioned below, so that I can setup the basic framework. To make it a customizable portfolio builting framework will be better once I have this!*


Plugins/Libraries used:
- HTML5-Boilerplate(https://github.com/h5bp/html5-boilerplate | http://html5boilerplate.com)
- Metro-UI-CSS (https://github.com/olton/Metro-UI-CSS)
- SmoothDivScroll (https://github.com/tkahn/Smooth-Div-Scroll)
- KnockoutJS (https://github.com/SteveSanderson/knockout)
- jQuery.ScrollTo (https://github.com/flesler/jquery.scrollTo)
- PyGithub (https://github.com/jacquev6/PyGithub)
- GithubArchive.org (https://github.com/igrigorik/githubarchive.org | http://www.githubarchive.org/) 


*Running on Google AppEngine - Python*

Features
----------
- Show your work experience, education, project details in a live tiles like UI.
- Data easily customizable using Github Gists (Steps to add data provided later)
- Using [GithubArchive.org](http://githubarchive.org), show you recent Github Activity feed by using the Windows 8 like Tiles.
  * Events that can be displayed here are **IssueEvent**, **PullRequestEvent**, **IssueCommentEvent**, **PullRequestReviewComment**.
- The query used here can again be customized as user wants. The data is fed to the UI using JSON files.
- UI is updated automatically using the *observable* feature in **KnockoutJS**.

Steps to setup your own portfolio using the Metro-UI Theme
----------------------------------------------------------

**Note:** Current setup allows anyone to setup their portfolio data (documented below) as a *Github GIST JSON File*
and then use this file on the python backend to consume them in this portfolio.


