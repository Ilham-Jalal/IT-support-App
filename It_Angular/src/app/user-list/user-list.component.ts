import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";
import {AuthService} from "../service/auth-service.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Role} from "../enum/Role";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls:['user-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) {}

  getRoleClass(role: Role): string {
    return `role-${role.toLowerCase()}`;
  }
  ngOnInit(): void {
    this.authService.findAllUsers().subscribe({
      next: (users: User[]) => this.users = users,
      error: (err: any) => console.error('Error fetching users:', err)
    });
  }
}
