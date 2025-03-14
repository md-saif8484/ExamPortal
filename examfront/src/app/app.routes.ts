import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { normalGuard } from './services/normal.guard';
import { adminGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';

export const routes: Routes = [
    {
        path: '', // Default route for root path
        component: HomepageComponent, 
        pathMatch: 'full',
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path:'admin',
        component:DashboardComponent,
        // pathMatch:'full',
        canActivate:[adminGuard],
        children:[
            {
                path:'',
                component:WelcomeComponent,
                // pathMatch:'full',
            },
            {
                path:'profile',
                component:ProfileComponent,
                // pathMatch:'full',
            }
        ],
    },
    {
        path:'user-dashboard',
        component:UserDashboardComponent,
        pathMatch:'full',
        canActivate:[normalGuard],
    },
];
