import { Component,OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  


constructor(private g: Globals) {
	console.log('--------------------------------------');
	console.log('Home constructor()');	
}

  ngOnInit() {	  
	console.log('Home ngOnInit()');
  }

  


}
