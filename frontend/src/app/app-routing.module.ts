import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AuthGuard } from './user/auth.guard';


const appRoutes: Routes = [
  {
    path: 'film',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./film/film.module').then((mod) => mod.FilmModule),
    data: { preload: true },
  },
  { path: '', redirectTo: 'film/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}