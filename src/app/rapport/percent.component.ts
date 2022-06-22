import { Component,OnInit } from '@angular/core';
import { Globals } from '../globals';
import {Subscription} from 'rxjs'
import { Rxjs } from '../services/rxjs';


@Component({
  selector: 'app-percent',
  templateUrl: './percent.html',
  styleUrls: []
})
export class PercentComponent implements OnInit {
   show=false
    public loadAPI!: Promise<any>;

clickEventSubscription:Subscription;
 public  url1 = '../assets/node_modules/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js';

 public  url = '../assets/node_modules/jquery.easy-pie-chart/easy-pie-chart.init.js';


constructor(private g: Globals,public rxjs:Rxjs) {
	 this.clickEventSubscription= this.rxjs.getClickEvent().subscribe(()=>{
      this.Show();
    })
}

  ngOnInit() {	  
	console.log('Test ngOnInit()');
    this.loadAPI = new Promise((resolve) => {
            console.log('resolving promise...');
            this.loadScript();
        });
    
  }
Show(){
this.show=true

   
}

  	public loadScript() {
        console.log('preparing to load...')
      let node1 = document.createElement('script');
        node1.src = this.url1;
        node1.type = 'text/javascript';
      
        document.getElementsByTagName('body')[0].appendChild(node1);


        let node = document.createElement('script');
        node.src = this.url;
        node.type = 'text/javascript';
       
        document.getElementsByTagName('body')[0].appendChild(node);
    }			


}
