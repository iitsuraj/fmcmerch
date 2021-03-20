import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
	data:string;

  constructor(@Inject(MAT_DIALOG_DATA) public sup: any) { 
  	this.data =  this.sup.name;
  }

  ngOnInit(): void {
  }

}
