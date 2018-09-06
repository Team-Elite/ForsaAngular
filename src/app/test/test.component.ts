import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  testTrue:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  EnableTextBox2(){
    this.testTrue=true;
    alert('test fired');
  }
}
