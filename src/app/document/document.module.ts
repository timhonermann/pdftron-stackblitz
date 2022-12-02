import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './containers/document/document.component';
import { DocumentRoutingModule } from 'src/app/document/document-routing.module';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    DocumentComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class DocumentModule { }
