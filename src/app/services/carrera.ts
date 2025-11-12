import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from '../models/carrera';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {

  url:string="http://localhost:8080/api/v1/carrera";
  constructor(private http:HttpClient){}
  //Listar categorías
  getAll():Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.url);
  }
  //Buscar Categoría por ID
  getById(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.url}/${id}`);
  }
  //Crear categoría
  create(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.url, carrera);
  }
  //Actualizar categoría
  update(id: number, carrera: Carrera): Observable<Carrera> {
    return this.http.put<Carrera>(`${this.url}/${id}`, carrera);
  }
  //Eliminar categoría
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  
}
