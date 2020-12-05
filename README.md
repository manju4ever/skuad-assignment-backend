## Skuad Assignment - Parallel Log Proccessor API

### Objective
* Design and Develop an API for analyzing log files parallelly.

* The solution should take a list of log files ("logFiles" -> array of strings) and count of parallel file processing ("parallelFileProcessingCount" -> integer) as input and output the number of exceptions grouped by time range and exception name. If processing for any file is finished then the next file should be picked immediately for processing, so that "parallelFileProcessingCount" number of files are being processed at every moment simultaneously, provided more than "parallelFileProcessingCount" number of files are remaining.

### How to Run ?

#### Pre-requisites:
* Node v10.x & above
* Node Package Manager (NPM) 7.0.x & above
* npx or run `npm i -g npx`

#### Steps to run
* Run `npm start`
* There server should start successfully at port `8080`

#### Running tests
* Run `npm test`

### Project Structure
```
📦src
 ┣ 📂controllers # All Controllers Go Here
 ┃ ┗ 📜LogProcessor.js
 ┣ 📂routes # All route definitons go here
 ┃ ┗ 📜index.js
 ┗ 📜index.js 
 ```