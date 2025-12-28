import { Component, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [
        RouterOutlet
    ]
})
export class AppComponent implements OnInit
{
    /**
     * Constructor
     */
    constructor(private _authService: AuthService)
    {
    }
    ngOnInit(): void {
    // Login automático como admin
    this._authService.signInAsAdmin().subscribe({
      next: () => {
        console.log('Sesión iniciada como admin automáticamente');
        // Opcional: redirigir a un módulo específico
      },
      error: (err) => {
        console.error('Error al iniciar sesión automáticamente', err);
      }
    });
  }

}
