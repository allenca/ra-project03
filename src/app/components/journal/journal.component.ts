import { Component, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { JournalEntry } from './journal.entry';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})

export class JournalComponent implements OnInit {
	private Journals:JournalEntry[]; // declare Journals as an array of JournalEntry

  constructor(private JournalService: JournalService) {
  	
  	// make the Journal Array actually have an empty placeholder, because 
  	// the JournalComponent doesn't have any data yet, 
  	// so it's empty for now, until the service passes back data
  	this.Journals = [];
  }

  ngOnInit() {
  	this.JournalService.getJournals(); // tells the component to use the journal service
  	this.Journals = this.JournalService.JournalArray;
  	console.log(this.Journals);
  }
}
