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
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddcategoryComponent } from './pages/admin/addcategory/addcategory.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionComponent } from './pages/admin/view-question/view-question.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { loginGuard } from './services/login.guard';
import { UserHomepageComponent } from './pages/user/user-homepage/user-homepage.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { StartComponent } from './pages/user/start/start.component';

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
        canActivate:[loginGuard]
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
            },
            {
                path:'categories',
                component:ViewCategoriesComponent,
            },
            {
                path:'addcategory',
                component:AddcategoryComponent,
            },
            {
                path:'quiz',
                component:ViewQuizzesComponent,
            },
            {
                path:'addquiz',
                component:AddQuizComponent,
            },
            {
                path:'quiz/:qid',
                component:UpdateQuizComponent,
            },
            {
                path:'view-questions/:id/:title',
                component:ViewQuestionComponent,
            },
            {
                path:'add-questions/:qid/:qtitle',
                component:AddQuestionsComponent,
            },
            {
                path:'update-question/:quesId/:qid/:qtitle',
                component:UpdateQuestionComponent,
            },
        ],
    },
    {
        path:'user-dashboard',
        component:UserDashboardComponent,
        canActivate:[normalGuard],
        children:[
            {
                path:':catId',
                component:UserHomepageComponent
            },
            {
                path:'instruction/:qid',
                component:InstructionComponent
            }
        ]
    },
    {
        path:'start/:qid',
        component:StartComponent,
        canActivate:[normalGuard],
    }
];
