import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000';
  }

  getReports() {
    return this.http.get(`${this.url}/report/reports`);
  }

  saveReport(report) {
    return this.http.post(`${this.url}/report/add-report`, report);
  }

  actualizarEstato(estado) {
    return this.http.put(`${this.url}/report/update-report`, estado);
  }

}

