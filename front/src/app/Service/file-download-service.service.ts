import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

  downloadFile(url: string, filename: string) {
    // URL vers le fichier dans le répertoire 'assets'
    const fileUrl = `assets/${url}`;

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        console.log('Fichier téléchargé, taille :', blob.size);  // Log de la taille du fichier téléchargé pour vérifier si le téléchargement fonctionne
        if (blob.size > 0) {
          console.log('Téléchargement réussi');
          saveAs(blob, filename);  // Sauvegarde du fichier téléchargé
        } else {
          console.error('Le fichier téléchargé est vide.');
        }
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement du fichier:', error);  // Gestion des erreurs
      }
    });
  }
}
