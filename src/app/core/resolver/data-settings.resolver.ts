import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../data/services/user.service';
import { catchError, map, of } from 'rxjs';



export const dataSettingsResolver: ResolveFn<any> = (route, state) => {
  const userService = inject(UserService);
  const token=localStorage.getItem('token');

  return userService.getUser(token).pipe(
    map((user:any)=>{
      return user;
    }),
    catchError(err=>{
      console.error(err);
      return of(null);
    })
  )

};
