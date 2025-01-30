import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { ContexteComponent } from './contexte/contexte.component';
import { RulesComponent } from './rules/rules.component';
import { RulesAnalysisComponent } from './rules-analysis/rules-analysis.component';
import { RulesConclusionComponent } from './rules-conclusion/rules-conclusion.component';
import { RulesRepartitionComponent } from './rules-repartition/rules-repartition.component';
import { RulesSolutionsComponent } from './rules-solutions/rules-solutions.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

export const routes: Routes = [
    {path: 'homepage', component: HomepageComponent},
    {path: 'contexte', component: ContexteComponent},
    {path: 'rules_analysis', component: RulesAnalysisComponent},
    {path: 'rules_conclusion', component: RulesConclusionComponent},
    {path: 'rules_repartition', component: RulesRepartitionComponent},
    {path: 'rules_solutions', component: RulesSolutionsComponent},
    {path: 'rules', component: RulesComponent},
    {path: 'user-registration', component: UserManagerComponent},
    { path: '**',
        redirectTo: 'homepage',
        pathMatch: 'full'
      },
    

];
