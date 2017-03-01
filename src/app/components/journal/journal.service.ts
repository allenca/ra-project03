import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise'

// model data
import { JournalEntry } from './journal.entry';

@Injectable()
export class JournalService {
    // url and api data set as variables
    // more legible, structured, easy to change
    private baseAPIKey = `94a08da1fecbb6e8b46990538c7b50b2`;
    private baseJournalUrl = `http://portal.helloitscody.com/inhabitent/api/get/${this.baseAPIKey}/?`;
    private baseJournalParams = `params=[{"name":"posts_per_page","value":"5"},{"name":"paged","value":"1"}]`;
    
    // code to post journal entries
    private postJournalUrl = `http://portal.helloitscody.com/inhabitent/api/post/${this.baseAPIKey}/?`;
    // private fixedURL = "http://portal.helloitscody.com/inhabitent/api/get/94a08da1fecbb6e8b46990538c7b50b2/?params=%5B%7B%22name%22:%22posts_per_page%22,%22value%22:%225%22%7D,%7B%22name%22:%22paged%22,%22value%22:%221%22%7D%5D"
    // fixedURL was used when baseJournalURL was suspected to be producing errors
    
    // encodeURI makes the result more legible
    private journalUrl = this.baseJournalUrl + encodeURI(this.baseJournalParams);

    //metadata found at top of files
    private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});
    
    // set journal array variable as a journal array that's vectored, so no chance anything other
    // than being set as array
	 JournalArray:JournalEntry[] = <JournalEntry[]>[];
	
	// when JournalService is made, it has the http component instance from angular
	constructor(private http: Http) { 
		console.log("creating journal service");
	};
	
	// set function to get journalURL data
	// set the data as a promise, call the promise returnedResponse, json it to make it useful
	getJournals(): Promise<JournalEntry[]> {
		return this.http.get(this.journalUrl).toPromise()
		.then(response => {
            let returnedResponse = response.json();
            
            // compare the data input by user to the data type in the journal model
            // sort the keys and corresponding inputs, set it to json string, set to lowercase
            // all so no mistakes in comparison
            let compareKeys = (a,b) => {
                console.log(a);
                console.log(b);
            
                let aKeys = Object.keys(a).sort();
                let bKeys = Object.keys(b).sort();
                return JSON.stringify(aKeys).toLowerCase() === JSON.stringify(bKeys).toLowerCase();
            };

            // new instance of journal called keyToCompare
            let keyToCompare = new JournalEntry();
            console.log(keyToCompare);
            for (let prop in returnedResponse){
            	//console.log(prop);
                let currentObject:JournalEntry = <JournalEntry>returnedResponse[prop];
                
                if (compareKeys(currentObject, keyToCompare)){
                	console.log(currentObject);
                    this.JournalArray.push(currentObject);
                }
            }
            console.log("222 in journal.service.ts 222");
            console.log(this.JournalArray);
            return this.JournalArray;
		})
	}


  addJournal(parameters:string):Promise<JournalEntry>{
    console.log("***** adding journal *****");
    let postURL = `${this.postJournalUrl}params=${parameters}`;
    console.log(postURL);
    let postSubmission = this.http.post(postURL,parameters,{headers:this.headers});
    let postSubmissionAsPromise = postSubmission.toPromise();
    let submissionResponse = (result) => result.json().data;
    let whatToDoWhenPromiseIsReturned = postSubmissionAsPromise.then(submissionResponse);
    let theWholePromise = whatToDoWhenPromiseIsReturned;
    return theWholePromise;
  }

  getSingleJournal(ID:number):Promise<JournalEntry>{
    let getRequest = this.http.get(this.journalUrl);
    console.log(getRequest);
    let requestAsPromise = getRequest.toPromise();
    let extractSingleJournal = (response:any):any => {
      let responseAsJson:any = response.json();
      console.log(responseAsJson); // should be array
      /* // one technique can employ the array 'filter' function
      let foundJournal:Journal = responseAsJson.filter(
        function(currentObject){
          return currentObject.ID === ID;
        }
      )
      */
      // this technique works too, but not as efficient
      for (let çurrentObject in responseAsJson){
          let potentialEntry = responseAsJson[çurrentObject];
        if ( (potentialEntry as Object).hasOwnProperty("ID") &&
            ((potentialEntry as JournalEntry).ID === ID) ) {
            return potentialEntry as JournalEntry;
          // end if
        }
          // end for loop
      }
      // end extractSingleJournalFunction
    };
    let taskToDoWhenPromiseIsReturned = extractSingleJournal;
    let theWholePromise = requestAsPromise.then(taskToDoWhenPromiseIsReturned);

    return theWholePromise;

  }
}
