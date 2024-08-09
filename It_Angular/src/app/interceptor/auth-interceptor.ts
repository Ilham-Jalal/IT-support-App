import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const HttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  console.log("Interceptor invoked");
  let cloned = req;
  const token = localStorage.getItem('jwt') || '';

  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(cloned);
}
