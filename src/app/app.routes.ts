import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { About } from './about/about';
import { Sighnup } from './sighnup/sighnup';
import { ExpenseList } from './expense-list/expense-list';





export const routes: Routes = [
    
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'sighnup',
        component: Sighnup
    },
    {
        path: 'expense-list', 
        component:ExpenseList
    },
    
];
