import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { ResetPasswordResolver } from './modules/auth/reset-password/resolver/reset-password.resolver';
import { UserResolver } from './user.resolver';

// @formatter:off
/* eslint-disable max-len */
export const appRoutes: Route[] = [
	// Redirect empty path to '/example'
	// {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

	// Redirect signed in user to the '/example'
	//
	// After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
	// path. Below is another redirection for that path to redirect the user to the desired
	// location. This is a small convenience to keep all main routes together here on this file.
	{ path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

	// Public routes
	{
		path: '',
		canActivate: [],
		canActivateChild: [],
		component: LayoutComponent,
		data: {
			layout: 'modern',
		},
		resolve: {
			initialData: UserResolver,
		},
		children: [
			{
				path: '',
				loadChildren: () => import('app/modules/public/landing/landing.module').then((m) => m.LandingModule),
			},
			{
				path: 'buscador-avanzado',
				loadChildren: () => import('app/modules/public/advanced-search/advanced-search.module').then((m) => m.AdvancedSearchModule),
			},
		],
	},

	// Auth routes for guests
	{
		path: '',
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [
			{ path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
			{ path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
			{ path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
			{ path: 'ingresar', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
			{ path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },
			{
				path: 'reestablecer-contrasena-2',
				resolve: {
					checkToken: ResetPasswordResolver,
				},
				loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then((m) => m.AuthResetPasswordModule),
			},
			{
				path: 'crear-cuenta',
				resolve: {
					checkToken: ResetPasswordResolver,
				},
				loadChildren: () => import('app/modules/auth/crear-cuenta/crear-cuenta.module').then((m) => m.CrearCuentaModule),
			},
		],
	},

	// Auth routes for authenticated users
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [
			{ path: 'cerrar-sesion', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
			{ path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then((m) => m.AuthUnlockSessionModule) },
		],
	},

	// Landing routes
	{
		path: '',
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [{ path: '', loadChildren: () => import('app/modules/public/landing/landing.module').then((m) => m.LandingModule) }],
	},

	// Admin routes
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'classy',
		},
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/modules/dashboards/adminmaster/adminmaster-dashboard.routes'),
			},
			{
				path: 'usuarios',
				loadChildren: () => import('app/modules/users/users.routes'),
			},
			{
				path: 'propiedades',
				loadChildren: () => import('app/modules/properties/properties.routes'),
			},
			// {
			// 	path: 'home',
			// 	loadChildren: () => import('app/modules/public/landing/landing.module').then((m) => m.LandingModule),
			// },
		],
	},

	{
		path: 'test',
		loadChildren: () => import('app/modules/test/test.routes'),
	},

	// Redirect any unmatched routes to the 'example'
	// { path: '**', redirectTo: '' },
];
