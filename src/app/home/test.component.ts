import { Component,OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrls: []
})
export class TestComponent implements OnInit {
  


constructor(private g: Globals) {
	console.log('--------------------------------------');	
	console.log('Test constructor()');	
}

  ngOnInit() {	  
	console.log('Test ngOnInit()');
  }


  


}
