import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { catchError, map, of } from 'rxjs';



export const dataDashboardResolver: ResolveFn<any> = (route, state) => { 
  
  const userService = inject(UserService);
  const token = localStorage.getItem('token');
    

  if (!token) {
    console.warn('⚠️ No hay token');
    return of([]);
  }

  return userService.getDataGit(token).pipe(
    map((data: any) => {
      console.log('✅ Datos recibidos:', data);
      return data;
    }),
    catchError(err => {
      console.error('❌ Error:', err);
      return of([]);
    })
  );
};
