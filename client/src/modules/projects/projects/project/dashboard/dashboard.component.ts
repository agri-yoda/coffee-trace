import { Component, Injector, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from 'src/modules/shared/services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/modules/shared/services/projects.service';
import { CoffeeService } from 'src/modules/shared/services/coffee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private activatedRoute: ActivatedRoute,
    private _Router: Router
    ) { }

  // Project Details
  project: any = {}
  selectedcard = 'card1';

  projectId = this.activatedRoute.snapshot.paramMap.get('id')
  // projectsService = this._Injector.get(ProjectsService)
  // CoffeeService = this._Injector.get(ProjectsService)

  // Utility Service
  utilityService = this._Injector.get(UtilityService)

  // Is loading Behaviour
  isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {
    
    // Start the Loader
    this.isLoading$.next(true)

    // Fetch the Project
    this.project = await this.utilityService.getProject()

    // Stop the Loader
    this.isLoading$.next(false)
  }
  
  selected(selectedcard: string){
    this.selectedcard = selectedcard
  }

}
