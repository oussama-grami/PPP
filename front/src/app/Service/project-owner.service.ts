import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectOwnerService {
  private apiUrl = `${environment.apiUrl}/api/project-owners`;
  private projectApiUrl = `${environment.apiUrl}/project/create`;
  private imageApiUrl = `${environment.apiUrl}/api/images`;

  constructor(private http: HttpClient) {}

  createProjectOwner(projectOwnerData: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, projectOwnerData);
  }

  getProjectOwnerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a project owner with a project, handling file uploads for banner and map images
   * @param projectOwnerData The project owner data
   * @param projectData The project data
   * @param formData FormData object containing the image files
   * @returns Observable with the created project ID
   */
  createProjectOwnerWithProject(
    projectOwnerData: any,
    projectData: any,
    formData: FormData
  ): Observable<any> {
    // First create the project owner
    return this.createProjectOwner(projectOwnerData).pipe(
      switchMap((ownerId) => {
        // Add project data and owner ID to formData
        formData.append('projectData', JSON.stringify(projectData));
        formData.append('projectOwnerId', ownerId.toString());

        // Use the image controller endpoint to upload images and create project
        return this.http.post<number>(
          `${this.imageApiUrl}/upload-project-images`,
          formData
        );
      })
    );
  }

  /**
   * Uploads a single image file
   * @param file The image file to upload
   * @param type The type of image (banner, map)
   * @returns Observable with the URL of the uploaded image
   */
  uploadImage(file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.http.post<any>(`${this.imageApiUrl}/upload`, formData);
  }

  /**
   * Gets an image by filename
   * @param filename The name of the image file
   * @returns Observable with the image blob
   */
  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.imageApiUrl}/${filename}`, {
      responseType: 'blob',
    });
  }
}
