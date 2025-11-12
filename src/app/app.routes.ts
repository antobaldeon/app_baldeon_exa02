 import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { EstudianteComponent } from './components/estudiante/estudiante';
import { CarreraComponent } from './components/carrera/carrera';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'estudiantes',component:EstudianteComponent},
    {path:'carreras',component:CarreraComponent},
    {path:'**',redirectTo:''}
];
