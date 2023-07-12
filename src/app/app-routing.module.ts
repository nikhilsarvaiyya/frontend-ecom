import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { PageNotFoundComponent } from './_components';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product-detail/:id/:name', component: ProductDetailComponent },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },


    // otherwise redirect to home
    { path: '**', redirectTo:''  }
     //{ path: '**', component:PageNotFoundComponent,  }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
