import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  fetchPosts(userID: number):Observable<any[]> {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
  }
}
