import { Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component'
import { ContexteComponent } from './views/contexte/contexte.component';
import { RulesComponent } from './views/rules/rules.component';
import { RulesAnalysisComponent } from './views/rules-analysis/rules-analysis.component';
import { RulesConclusionComponent } from './views/rules-conclusion/rules-conclusion.component';
import { RulesRepartitionComponent } from './views/rules-repartition/rules-repartition.component';
import { RulesSolutionsComponent } from './views/rules-solutions/rules-solutions.component';
import { UserManagerComponent } from './views/user-manager/user-manager.component';

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
