import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './containers/document/document.component';
import { DocumentRoutingModule } from 'src/app/document/document-routing.module';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';



@NgModule({
  declarations: [
    DocumentComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
