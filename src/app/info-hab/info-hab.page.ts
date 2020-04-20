import { habService } from './../shared/hab.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-info-hab',
  templateUrl: './info-hab.page.html',
  styleUrls: ['./info-hab.page.scss'],
})
export class InfoHabPage implements OnInit {

  constructor(public API:habService) { }

  ngOnInit() {
  }

}
