import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  private init: DOMHighResTimeStamp = 0;

  fileUrl = '';

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.init = performance.now();
    const id = this.route.snapshot.params['id'];
    this.fileUrl = `/assets/test_pdf_${id}.pdf`;
  }

  onLoaded(): void {
    console.log('loaded: ', performance.now() - this.init);
  }

}
