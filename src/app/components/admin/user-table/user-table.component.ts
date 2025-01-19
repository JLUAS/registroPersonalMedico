import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { UserTable } from '../../../models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  users: UserTable[] = [];
  paginatedData: UserTable[] = [];
  editUser: UserTable | null = null; // Usuario que se está editando
  isAdmin: boolean = false;
  isEditModal: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.isAdmin = this.usersService.hasTokenAdmin();
    if (this.isAdmin) {
      this.loadUsers();
    } else {
      this.errorMessage = 'No tienes permisos para ver esta información.';
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe(
      (users: UserTable[]) => {
        this.users = users;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.paginateData();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
        this.errorMessage = 'Error al cargar los usuarios.';
        this.isLoading = false;
      }
    );
  }

  paginateData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.users.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateData();
    }
  }

  editModal(user: UserTable): void {
    this.editUser = { ...user }; // Copiar los datos del usuario a editar
    this.isEditModal = true;
  }

  closeEditModal(): void {
    this.isEditModal = false;
    this.editUser = null; // Limpiar datos del usuario en edición
  }

  saveUserChanges(form: NgForm): void {
    if (this.editUser && this.editUser.username.length>=8) {
      this.usersService.editUser(this.editUser).subscribe(
        (response) => {
          console.log('Usuario actualizado:', response);
          this.closeEditModal();
          this.loadUsers(); // Refrescar la tabla
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
          this.errorMessage = 'No se pudo actualizar el usuario.';
        }
      );
    }else{
      this.errorMessage = 'No se pudo actualizar el usuario, datos no validos.';
    }
  }
}
