import { Component, OnInit,Input,Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import {
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupeCode } from '../../entities/GroupeCode';
import { Globals } from 'src/app/globals';
import { GroupeSvc } from '../../services/groupeSvc';
interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges  {
 @Input() jsonFormData: any;
 @Output("submite") submite: EventEmitter<any> = new EventEmitter();
 public myForm: FormGroup = this.fb.group({});
 public resultat:[]|any
 public img:any;
 public libelle:string=""
 
 public color1: string="";
 public reader = new FileReader();
 public GroupeCode : GroupeCode = new GroupeCode();
 public imageAsBase64 : string = '';
public defaultImageAsBase64 : string = '';
submit=false
  constructor(private fb: FormBuilder,private GroupeSvc:GroupeSvc,public g:Globals) { 
   
  }
public groupe:any = {
 
        "name": "Groupe",
      "label": "Groupe;",
      "value": "null",
      "type": "select",
      "option":[],
      "validators": {"required": true,
        }
    };
public  $: any;
   fileChangeEvent(event:any) {
    
    // Not supported in Safari for iOS.
   const image:any=document.getElementById("yourImgTag")
   const img2:any=document.getElementById("yourImgTag1")
   //const file:any=(<any>document.querySelector('input[type=file]')).files[0]
  let file = event.target.files[0];
  const reader=new FileReader()

  reader.addEventListener('load', () =>{
     console.log("result==",(this.myForm))
    image.src = reader.result;
     img2.src = reader.result;
         this.myForm.patchValue({
     
          ImageAsString: (<string>reader.result).split(',')[1]
       });
  },false);
  if(file){
   
    reader.readAsDataURL(file);
  }
  
}  

    ngOnChanges(changes: SimpleChanges) {
     if (!changes.jsonFormData.firstChange) {
       
      //console.log("this.jsonFormData==",this.jsonFormData)
      this.createForm(this.jsonFormData.controls);
    } 
  }

  public createForm(controls: JsonFormControls[]) {
 
    for (const control of controls) {
     // console.log("Data2==",control)
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
     //  console.log('Form valid201: ', this.myForm);
    }
  }
  onSubmit() {
    this.submit=true;
   // console.log('Form valid: ', this.myForm.status);
    if(this.myForm.status=="VALID"){
this.submite.emit(this.myForm);
    }
    //console.log('Form values: ', this.myForm.value);
  }

}
