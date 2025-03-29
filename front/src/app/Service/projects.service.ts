import {Injectable} from '@angular/core';
import {project} from "../Models/project";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects: project[] = []

  constructor() {
    this.getProjects().subscribe(data => {
      this.projects = data;
    })
  }

  getProjectById(id: number) {
    return this.getProjects().pipe(
      map(projects => projects.find(project => project.id === id))
    );
  }

  getProjects(): Observable<project[]> {
    //simulation of database request
    this.projects.push({
        id: 1,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: "/details",
        category: "Trees & Forests'",
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 2,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 5000,
        minimumPurchase: 20
      },
      {
        id: 3,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 4,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 5,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 6,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 7,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 8,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 9,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 10,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 11,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 12,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 13,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      },
      {
        id: 14,
        url: '/assets/img/projet1.png',
        cost: '2.48',
        routing: '/details',
        category: 'Trees & Forests',
        name: 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg',
        availableStock: 200,
        minimumPurchase: 20
      });
    return of(this.projects);
  }
}
