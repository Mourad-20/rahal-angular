import { Component, OnInit,Input,Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.css']
})
export class LocaliteComponent implements OnInit {
   @Output("event_localite") event_localite: EventEmitter<any> = new EventEmitter();

public totalColor : string = "box bg-dark text-center";
public serveurColor : string = "box bg-dark text-center";
public tableColor : string = "box bg-dark text-center";
  constructor() { }

  ngOnInit(): void {
  }

}
