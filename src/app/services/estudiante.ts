import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {

  url:string="http://localhost:8080/api/v1/estudiante";
  constructor(private http: HttpClient) {}

  // Listar todos los estudiantes
  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }

  // Buscar estudiante por ID
  getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}`);
  }

  // Crear nuevo estudiante (con referencia a una carrera)
  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.url, estudiante);
  }

  // Actualizar estudiante
  update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${id}`, estudiante);
  }

  // Eliminar estudiante
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Obtener estudiantes por carrera
  getByCarrera(carreraId: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.url}/carrera/${carreraId}`);
  }
}
