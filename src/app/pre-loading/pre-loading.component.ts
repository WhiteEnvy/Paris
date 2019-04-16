import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'pre-loading',
  templateUrl: './pre-loading.component.html',
  styleUrls: ['./pre-loading.component.scss']
})
export class PreLoadingComponent implements OnInit {
  @ViewChild("loading")
  private img: ElementRef;

  ngOnInit() {
    this.img.nativeElement.style.top = window.innerHeight / 2 - 100 + "px";
  }
}
