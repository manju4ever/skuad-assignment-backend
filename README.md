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

### Input Looks like
```
586763334341 1573594032526 NullPointerException
586763335341 1573594032527 NullPointerException
586763334342 1573594032528 IllegalAgrumentsException
586763334343 1573596032526 UserNotFoundException
586763334344 1573597032526 NullPointerException
586763334345 1573598032526 UserNotFoundException
586763335345 1573598032526 UserNotFoundException
586763336345 1573598032536 UserNotFoundException
586763334346 1573599032537 UserNotFoundException
586763334347 1573600032526 NullPointerException
586763334348 1573601032527 UserNotFoundException
586763334349 1573602032527 NullPointerException
586763335349 1573602032529 NullPointerException
586763334350 1573603032527 IllegalAgrumentsException
586763334351 1573604032527 UserNotFoundException
586763334352 1573605032527 NullPointerException
586763334353 1573606032527 UserNotFoundException
586763334354 1573607032527 IllegalAgrumentsException
586763334355 1573608032527 UserNotFoundException
586763334356 1573609032527 NullPointerException
586763334357 1573610032527 IllegalAgrumentsException
586763334358 1573611032527 IllegalAgrumentsException
586763334359 1573612032527 UserNotFoundException
586763334360 1573613032527 NullPointerException
586763334361 1573614032528 IllegalAgrumentsException
```

### Output Looks like
![image](https://user-images.githubusercontent.com/9355984/101281634-20ff0b00-37f6-11eb-8784-903269ab35e4.png)

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
