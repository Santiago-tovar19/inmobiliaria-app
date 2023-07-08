import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { ResetPasswordResolver } from './modules/auth/reset-password/resolver/reset-password.resolver';
import { UserResolver } from './user.resolver';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

	// Redirect empty path to '/example'
	// {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

	// Redirect signed in user to the '/example'
	//
	// After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
	// path. Below is another redirection for that path to redirect the user to the desired
	// location. This is a small convenience to keep all main routes together here on this file.
	{path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},




	// Public routes
	{
		path: '',
		canActivate: [],
		canActivateChild: [],
		component: LayoutComponent,
		data: {
			layout: 'modern'
		},
		resolve: {
			initialData: UserResolver
		},
		children: [
			{
				path: '',
				loadChildren: () =>
					import('app/modules/public/properties/properties.module').then(m => m.PropertyModule),
			}
		]
	},


	// Auth routes for guests
	{
		path: '',
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
			{path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
			{path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
			{path: 'ingresar', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
			{path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)},
			{
				path: 'reestablecer-contrasena-2',
				resolve: {
					checkToken: ResetPasswordResolver,
				},
				loadChildren: () =>
					import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule),
			},
			{
				path: 'crear-cuenta',
				resolve: {
					checkToken: ResetPasswordResolver,
				},
				loadChildren: () =>
					import('app/modules/auth/crear-cuenta/crear-cuenta.module').then(m => m.CrearCuentaModule),
			},
		]

	},

	// Auth routes for authenticated users
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
			{path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
		]
	},

	// Landing routes
	{
		path: '',
		component  : LayoutComponent,
		data: {
			layout: 'empty'
		},
		children   : [
			{path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
		]
	},

	// Admin routes
	{
		path       : '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component  : LayoutComponent,
		resolve    : {
			initialData: InitialDataResolver,
		},
		children   : [
			{
				path: 'dashboard',
				loadChildren: () => import('app/modules/dashboards/adminmaster/adminmaster-dashboard.module').then(m => m.AdminMasterDashboardModule)
			},
			{
				path: 'usuarios',
				loadChildren: () => import('app/modules/users/users.module').then(m => m.UsersModule),
			},
			{
				path: 'propiedades',
				loadChildren: () => import('app/modules/properties/properties.module').then(m => m.PropertiesModule),
			},
			{
				path: 'test',
				loadChildren: () => import('app/modules/test/test.module').then(m => m.TestModule),
			}
		]
	}
];
