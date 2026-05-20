import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const token=localStorage.getItem('token');
  const authService=inject(AuthService);
  
  if(!token){
    router.navigate(['/login']);
    return false;
  }

  authService.verificartoken(token).subscribe({
    next:(response)=>{
      if(response.ok==true){
        return true;
      }else{
        router.navigate(['/login']);
        return false;
      }
    },
    error:(error)=>{
      router.navigate(['/login']);
      return false;
    }
  })

  return true;
};
