import { Component, OnInit } from '@angular/core';
import { JournalService } from './journal.service';
import { JournalEntry } from './journal.entry';
declare var $:any;

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})

export class JournalComponent implements OnInit {
    private Journals:JournalEntry[] = []; // declare Journals as an array of JournalEntry

 constructor(private JournalService: JournalService) {
      
      // make the Journal Array actually have an empty placeholder, because
      // the JournalComponent doesn't have any data yet,
      // so it's empty for now, until the service passes back data
      this.Journals = [];
  }

 ngOnInit(): void {
    
    this.getJournals();
    
    
  }

 getJournals(): void {
    console.log('getting journals');
    let myPromiseOfJournals:Promise<JournalEntry[]> = this.JournalService.getJournals();
    //console.log(myPromiseOfJournals);
   myPromiseOfJournals.then(
        journals => {

       this.Journals = <JournalEntry[]>journals;
            
       console.log(this.Journals)
        
        // console.log(this.journalEntries);
        // console.log("***** in journal.component.ts callback *****");
        
        }).then(
        run =>{
            for(let i=0;i<this.Journals.length;i++){
             let journal:JournalEntry = this.Journals[i];
           
             let journalTitle:string = journal.title;
             let journalContent:string = journal.content;
             let journalImage:string = journal.image;

             //document.write(journalTitle);
           

            }
        });
  }
//   owlCarousel() {
//     $(document).ready(function(){
//             $('.owl-carousel').owlCarousel({
//               loop:true,
//               margin:10,
//               responsiveClass:true,
//               responsive:{
//                   0:{
//                       items:1,
//                       nav:true
//                   },
//                   600:{
//                       items:2,
//                       nav:false
//                   },
//                   1050:{
//                       items:3,
//                       nav:true,
//                       loop:false
//                     }
//                 }
//             })

//        });

// }
}