import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarUsuarioComponent, CadastroUsuarioComponent } from './components';

export const CadastroUsuarioRoutes: Routes = [
	{
		path: 'cadastro-usuario',
		component: CadastroUsuarioComponent,
		children: [
		  {
			path: '', 
			component: CadastrarUsuarioComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
  	RouterModule.forChild(CadastroUsuarioRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CadastroPjRoutingModule {
}


