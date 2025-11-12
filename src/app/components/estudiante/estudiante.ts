import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante';
import { Estudiante } from '../../models/estudiante';
import bootstrap from '../../../main.server';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera';

@Component({
  selector: 'app-estudiante',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css',
})
export class EstudianteComponent implements OnInit{
    
    estudiantes: Estudiante[] = [];
  carreras: Carrera[] = [];
  tituloModal = "Nuevo Estudiante";
  editId: number | null = null;

  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    fecha_nacimiento: ['', Validators.required],
    carreraId: this.fb.control<number | null>(null, [Validators.required])
  });

  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  private bsModal: any;

  constructor(
    private estudianteService: EstudianteService,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.listarCarreras();
  }

  listar() {
    this.estudianteService.getAll().subscribe(response => this.estudiantes = response);
  }

  listarCarreras() {
    this.carreraService.getAll().subscribe(response => this.carreras = response);
  }

  abrirNuevo() {
    this.tituloModal = "Nuevo Estudiante";
    this.editId = null;
    this.form.reset();
    this.showModal();
  }

  abrirEditar(est: Estudiante) {
    this.tituloModal = 'Editar Estudiante';
    this.editId = est.id!;
    this.form.patchValue({
      nombre: est.nombre,
      apellido: est.apellido,
      fecha_nacimiento: est.fecha_nacimiento,
      carreraId: est.carreraId
    });
    this.showModal();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar estudiante?')) {
      this.estudianteService.delete(id).subscribe(() => this.listar());
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const dto: Estudiante = {
      id: this.editId || undefined,
      nombre: this.form.value.nombre!,
      apellido: this.form.value.apellido!,
      fecha_nacimiento: this.form.value.fecha_nacimiento!,
      carreraId: this.form.value.carreraId!
    };

    const obs = this.editId
      ? this.estudianteService.update(this.editId, dto)
      : this.estudianteService.create(dto);

    obs.subscribe({
      next: _ => {
        this.hideModal();
        this.listar();
      }
    });
  }

  private showModal() {
    const m = this.modalRef.nativeElement;
    // @ts-ignore – Bootstrap global (bundle script en angular.json)
    this.bsModal = new bootstrap.Modal(m);
    this.bsModal.show();
  }

  private hideModal() {
    if (this.bsModal) {
      this.bsModal.hide();
    }
  }
 

}

  


