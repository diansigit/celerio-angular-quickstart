$output.webapp("app/app.component.ts")##
import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

#foreach($entity in $project.withoutManyToManyJoinEntities.list)
import { ${entity.service.type} } from './entities/${entity.model.var}/${entity.model.var}.service';
import { ${entity.model.type}ListComponent } from './entities/${entity.model.var}/${entity.model.var}-list.component';
import { ${entity.model.type}DetailComponent } from './entities/${entity.model.var}/${entity.model.var}-detail.component';
#end

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
#foreach($entity in $project.withoutManyToManyJoinEntities.list)
      <a [routerLink]="['/${entity.model.var}list']">${entity.model.type} List</a><br/>
#end
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [
        ROUTER_DIRECTIVES
#foreach($entity in $project.withoutManyToManyJoinEntities.list)
        , ${entity.model.type}ListComponent, ${entity.model.type}DetailComponent
#end
    ],
    providers: [
        ROUTER_PROVIDERS
#foreach($entity in $project.withoutManyToManyJoinEntities.list)
        , ${entity.service.type}
#end
    ]
})
@Routes([
#foreach($entity in $project.withoutManyToManyJoinEntities.list)
#if($velocityCount > 1)
    ,
#end
    { path: '/${entity.model.var}list', component: ${entity.model.type}ListComponent },
    { path: '/${entity.model.var}/:id', component: ${entity.model.type}DetailComponent }
#end
])
export class AppComponent {
    title = 'Tour of Entities';
}
