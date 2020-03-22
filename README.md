# Automation Dashboard

Automation Dashboard is a spample dashboard for to show the results of the automation scripts in web/mobile or APIs.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the node version `6.x`
* You have installed the gulp on your machine
* This project runs on `Angular 1.7.2`

## Using automation dashboard

To use automation dashboard, follow these steps:

```
npm start
```

The project runs on port 6004.

## Details
* The main dashboard contains the data from the latest release on all the platforms
* `Releases` contains data from the last 5 releases
* `Test Runs` has he detailed report of the ongoing automation segregated by the suite name
* `Run Details` can be viewed by clicking on any of the test run to get the detailed view of the particular suite
* `Test Steps`, `Screenshots` and `Console Logs` can be checked for each of the test run

```
All the data that is getting displayed currently is added in json files in the project.
```
