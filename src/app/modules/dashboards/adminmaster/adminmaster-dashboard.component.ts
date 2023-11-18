import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { DashboardsService } from '../service/dashboards.service';
import { NgFor, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'adminmaster-dashboard',
	templateUrl: './adminmaster-dashboard.component.html',
	styleUrls: ['./adminmaster-dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [MatIconModule, MatButtonModule, RouterLink, NgFor, NgStyle],
})
export class AdminMasterDashboardComponent {
	data: any = { moreViewedProperties: [] };
	public properties = [];
	environment = environment;
	/**
	 * Constructor
	 */
	constructor(private _dashboardsService: DashboardsService, private router: Router) {
		this.getDashboardData();
	}

	getDashboardData() {
		this._dashboardsService.getAdminMasterDashboard().subscribe((response: any) => {
			console.log(response);
			this.data = response.data;
			this.properties = response.data.moreViewedProperties;
		});
	}

	getImgUrl(p) {
		if (p.property?.images?.length > 0) {
			return this.environment.assets + '/storage/properties/' + p.property?.images[0]?.name;
		}
		return 'https://dummyimage.com/200/263547/fff&text=Propiedad';
	}

	goToProperty(id: string): void {
		this.router.navigate(['/propiedades/', id]);
		console.log(id);
	}
}
