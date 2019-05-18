import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

export interface IncidentData {
  id: string;
  category: 'image' | 'audio';
  tags: ('fire' | 'people' | 'rescue')[];
  location: [number, number, number];
  time: string;
  rank: number;
}

function generateFakeData() {
  const n = Math.round(Math.random() * 20);
  const lon1 = -117.2;
  const lon2 = -116.8;
  const lat1 = 32.6;
  const lat2 = 32.9;

  const output = [] as IncidentData[];

  for (let i = 0; i < n; ++i) {
    const lon = Math.random() * (lon2 - lon1) + lon1;
    const lat = Math.random() * (lat2 - lat1) + lat1;

    const id = 'device_' + Math.random().toString();
    const time = Math.random().toString();
    const category = Math.random() > 0.5 ? 'image' : 'audio';
    const location = [lon, lat, 0] as any;
    const tags = Math.random() > 0.5 ? ['fire'] : ['rescue'] as any;
    const rank = Math.round(Math.random() * 5);

    output.push({id, time, category, location, tags, rank});
  }
  return output;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentDataService {

  constructor(public http: HttpClient) { }

  getData(): Observable<IncidentData[]> {
    return from([generateFakeData()]);
  }
}
