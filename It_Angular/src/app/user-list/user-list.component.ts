import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";
import {AuthService} from "../service/auth-service.service";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.findAllUsers().subscribe({
      next: (users: User[]) => this.users = users,
      error: (err: any) => console.error('Error fetching users:', err)
    });
  }
}
