import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {path: 'home', title: 'Inicio' , component: HomeComponent},
  {path: 'login/:isLogged', title: 'Login' , component: LoginComponent},
  {path: 'register', title: 'Register' , component: RegisterComponent},
  {path: 'contact', title: 'Contacto' , component: ContactFormComponent},
  {path: 'product/:id', title: 'Product' , component: ProductComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
