import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiBaresService {
  private apiUrl = '/api/businesses/search?term=bars&location=';
  private apiKey = 'ZWnHm9L2J9sfoHaMfWvoa2pVWtS865h-yKnPDLVoTGpwWEtsf2IUv6QXFp07sHSh1EnCktGKw00W2KTDQiYk8LQMFM1jDt4wGpH4Fb0PTrgQlkAGNmctSoSG6a9eZHYx';

  constructor(private http: HttpClient) { }

  
  getUsers(): any{
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
  }
}
