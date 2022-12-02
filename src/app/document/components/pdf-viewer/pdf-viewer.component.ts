import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges, Output,
  SecurityContext,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { from, Observable, tap } from 'rxjs';

const DISABLED_ELEMENTS = [
  'downloadButton',
  'themeChangeButton',
  'printButton',
  'thumbDelete',
  'thumbRotateClockwise',
  'pageManipulationOverlayButton',
  'thumbMultiDelete',
  'thumbMultiRotate',
  'thumbExtract',
  'dropdown-item-toolbarGroup-Edit',
  'dropdown-item-toolbarGroup-Shapes',
  'dropdown-item-toolbarGroup-Insert',
  'dropdown-item-toolbarGroup-FillAndSign',
  'dropdown-item-toolbarGroup-Forms',
  'dropdown-item-toolbarGroup-Measure',
  'dropdown-item-toolbarGroup-Annotate',
  'toolbarGroup-Edit',
  'toolbarGroup-Shapes',
  'toolbarGroup-Insert',
  'toolbarGroup-FillAndSign',
  'toolbarGroup-Forms',
  'toolbarGroup-Measure',
  'toolbarGroup-Annotate',
];

const DISABLED_FEATURES = [
  'ThumbnailMerging',
  'ThumbnailReordering',
];

const DATE_FORMAT = 'DD.MM.YYYY';

const HIGHEST_PRINTING_QUALITY = 5;

const DEFAULT_TOOL = 'TextSelect';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit, OnChanges {
  @ViewChild('viewer') viewer!: ElementRef;

  @Input() fileUrl?: string;

  @Output() loaded = new EventEmitter<void>();

  private instance!: WebViewerInstance;

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  ngAfterViewInit(): void {
    this.initWebViewer().subscribe(() => {
      this.setDocumentLoadedListener();
      this.setDocumentUrl();
      this.setDateFormat();
      this.setUser();
      this.disableElements();
      this.disableFeatures();
      this.setToolbarGroup();
      this.setPrintQuality();
      this.setFitMode();
      this.setDocumentUrl();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileUrl']) {
      this.setDocumentUrl();
    }
  }

  private initWebViewer(): Observable<WebViewerInstance> {
    const webViewer = WebViewer(
      {
        licenseKey: '',
        path: '/assets/pdf_tron',
        initialDoc: this.fileUrl
      },
      this.viewer.nativeElement
    );

    return from(webViewer).pipe(
      tap((instance) => (this.instance = instance)),
    );
  }

  private setDocumentUrl(): void {
    if (this.instance) {
      this.instance.UI.loadDocument(
        this.sanitizer.sanitize(SecurityContext.URL, this.fileUrl ?? null) ?? ''
      );
    }
  }

  private setDocumentLoadedListener(): void {
    this.instance.Core.documentViewer.addEventListener('documentLoaded', () => {
      this.loaded.emit();
    });
  }

  private setPrintQuality(): void {
    this.instance.UI.setPrintQuality(HIGHEST_PRINTING_QUALITY);
  }

  private setFitMode(): void {
    const fitMode = this.instance.UI.FitMode;

    this.instance.UI.setFitMode(fitMode.FitWidth);
  }

  private setDateFormat(): void {
    this.instance.UI.setNoteDateFormat(DATE_FORMAT);
  }

  private disableElements(): void {
    this.instance.UI.disableElements(DISABLED_ELEMENTS);
  }

  private disableFeatures(): void {
    this.instance.UI.disableFeatures(DISABLED_FEATURES);
  }

  private setToolbarGroup(): void {
    this.instance.UI.setToolbarGroup('toolbarGroup-Annotate');
    this.setDefaultTool();
  }

  private setUser(): void {
    this.instance.Core.annotationManager.setCurrentUser('My User');
    this.instance.Core.annotationManager.promoteUserToAdmin();
  }

  private setDefaultTool(): void {
    this.instance.UI.setToolMode(DEFAULT_TOOL);
  }
}
