import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('alumno') !== null) {
      return true;
    } else {
      this.router.navigate(['/registro']);
      return false;
    }
  }
}
