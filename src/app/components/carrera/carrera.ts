import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera';

@Component({
  selector: 'app-carrera',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './carrera.html',
  styleUrl: './carrera.css',
})
export class CarreraComponent implements OnInit {

   ngOnInit(): void {
    this.listar();
  }
  listar(){
    this.carreraService.getAll().subscribe(response => this.carreras = response);
  }

  private fb = inject(FormBuilder);

  carreras: Carrera[] = [];
  tituloModal = "Nueva Carrera";
   form = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]]
  });

  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  private bsModal: any;
  editId: number | null = null;
  constructor(private carreraService: CarreraService){}
 
  abrirEditar(car: Carrera){
    this.tituloModal = 'Editar Carrera';
    this.editId = car.id!;
    this.form.patchValue({
      nombre: car.nombre
    });
    this.showModal();
  }
  eliminar(id:number){
    if(confirm('¿Eliminar Categoría?')){
      this.carreraService.delete(id).subscribe(()=> 
        this.listar());
    }
  }
  guardar(){
    if(this.form.invalid) return;
    const dto: Carrera = {
      id: this.editId || undefined,
      nombre: this.form.value.nombre!
    };
    const obs = this.editId ? this.carreraService.update(this.editId, dto) : 
    this.carreraService.create(dto);
    obs.subscribe({ next: _ =>{
      this.hideModal();
      this.listar();
    }
  })
  }
  abrirNuevo(){
    this.tituloModal = "Nueva Carrera"
    this.editId = null;
    this.showModal();
  }
  private showModal(){
    const m = this.modalRef.nativeElement;
    // @ts-ignore – Bootstrap global (bundle script en angular.json)
    this.bsModal = new bootstrap.Modal(m);
    this.bsModal.show();
  }
  private hideModal(){
    if(this.bsModal){
      this.bsModal.hide();
    }
  } 

}
