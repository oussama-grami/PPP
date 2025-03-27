import { Injectable } from '@angular/core';
import {project} from "../Models/project";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects : project[] = [];
  constructor() { }
  getProjects():Observable<project[]>{
    //simulation of database request
    this.projects.push({
      url:'/assets/img/projet1.png',
      cost :'2.48',
      routing : "/details",
      category : "Trees & Forests'",
      name : 'Tree planting in Testour',
      flag: '/assets/img/tunisiaFlag.svg'
    },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : "'/details'",
        category : "'Trees & Forests'",
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      },
      {
        url:'/assets/img/projet1.png',
        cost :'2.48',
        routing : '/details',
        category : 'Trees & Forests',
        name : 'Tree planting in Testour',
        flag: '/assets/img/tunisiaFlag.svg'
      });
    return of(this.projects);
  }
}
