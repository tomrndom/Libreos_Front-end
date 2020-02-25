import { DataResolverService } from './resolver/data-resolver.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'library', loadChildren: './pages/library/library.module#LibraryPageModule' },
  { path: 'add-book', loadChildren: './pages/add-book/add-book.module#AddBookPageModule' },
  { path: 'search-book', loadChildren: './pages/search-book/search-book.module#SearchBookPageModule' },
  { path: 'add-book-scan', loadChildren: './pages/add-book-scan/add-book-scan.module#AddBookScanPageModule' },
  { path: 'add-book-manual', loadChildren: './pages/add-book-manual/add-book-manual.module#AddBookManualPageModule' }, {
    path: 'add-book-manual/:id',
    resolve: {
      special: DataResolverService
    }, loadChildren: './pages/add-book-manual/add-book-manual.module#AddBookManualPageModule'
  },
  { path: 'add-book-confirmation', loadChildren: './pages/add-book-confirmation/add-book-confirmation.module#AddBookConfirmationPageModule' },
  {
    path: 'detail-book/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './pages/detail-book/detail-book.module#DetailBookPageModule'
  },
  { path: 'profile-edit', loadChildren: './pages/profile-edit/profile-edit.module#ProfileEditPageModule' },
  { path: 'transaction', loadChildren: './pages/transaction/transaction.module#TransactionPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'start-guide', loadChildren: './pages/start-guide/start-guide.module#StartGuidePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
