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
    private fixedURL = "http://portal.helloitscody.com/inhabitent/api/get/94a08da1fecbb6e8b46990538c7b50b2/?params=%5B%7B%22name%22:%22posts_per_page%22,%22value%22:%225%22%7D,%7B%22name%22:%22paged%22,%22value%22:%221%22%7D%5D"
    // encodeURI makes the result more legible
    private journalUrl = this.baseJournalUrl + encodeURI(this.baseJournalParams);
    
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
		return this.http.get(this.fixedURL).toPromise()
		.then(response => {
            let returnedResponse = response.json();

            console.log(" in journal.service.ts ");
            
            // compare the data input by user to the data type in the journal model
            // sort the keys and corresponding inputs, set it to json string, set to lowercase
            // all so no mistakes in comparison
            let compareKeys = (a,b) => {
                let aKeys = Object.keys(a).sort();
                let bKeys = Object.keys(b).sort();
                return JSON.stringify(aKeys).toLowerCase() === JSON.stringify(bKeys).toLowerCase();
            };
            // new instance of journal called keyToCompare
            let keyToCompare = new JournalEntry();
            console.log(keyToCompare);
            for (let prop in returnedResponse){
                let currentObject:JournalEntry = <JournalEntry>returnedResponse[prop];
                if (compareKeys(currentObject, keyToCompare)){
                    this.JournalArray.push(currentObject);
                }
            }
            console.log("***** in journal.service.ts *****");
            console.log(this.JournalArray);
            return this.JournalArray;
		})
		.catch(this.handleError);
	}
	// if there is any error, this message is displayed from the promise method hard coded in NG
	private handleError(error: any): Promise<any> {
    	console.error('An error occurred', error);
    	return Promise.reject(error.message || error);
    }
}
