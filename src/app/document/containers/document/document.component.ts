import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {

  fileUrl = '';

  isLoading = true;

  private init: DOMHighResTimeStamp = 0;

  constructor(private readonly route: ActivatedRoute, private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init = performance.now();
    const id = this.route.snapshot.params['id'];
    this.fileUrl = `/assets/test_pdf_${id}.pdf`;
  }

  onLoaded(): void {
    console.log('loaded: ', performance.now() - this.init);
    this.isLoading = false;
    this.cdr.detectChanges();
  }

}
