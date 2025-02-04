import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { ContexteComponent } from './contexte/contexte.component';
import { RulesComponent } from './rules/rules.component';
import { RulesAnalysisComponent } from './rules-analysis/rules-analysis.component';
import { RulesConclusionComponent } from './rules-conclusion/rules-conclusion.component';
import { RulesRepartitionComponent } from './rules-repartition/rules-repartition.component';
import { RulesSolutionsComponent } from './rules-solutions/rules-solutions.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { InclusifCardsComponent } from './inclusif-cards/inclusif-cards.component';
import { NavigationCardComponent } from './inclusif-cards/navigation-card/navigation-card.component';
import { SolutionsComponent } from './solutions/solutions.component';

export const routes: Routes = [
    {path: 'homepage', component: HomepageComponent},
    {path: 'contexte', component: ContexteComponent},
    {path: 'rules_analysis', component: RulesAnalysisComponent},
    {path: 'rules_conclusion', component: RulesConclusionComponent},
    {path: 'rules_repartition', component: RulesRepartitionComponent},
    {path: 'rules_solutions', component: RulesSolutionsComponent},
    {path: 'rules', component: RulesComponent},
    {path: 'user-registration', component: UserManagerComponent},
    {path: 'cartes_inclusif',
          component: InclusifCardsComponent,
          children: [
            { path: '', redirectTo: 'carte', pathMatch: 'full' }, // Redirection vers carte avec query params
            {
              path: 'carte',
              component: NavigationCardComponent,  // Le composant NavigcardComponent reste ici
            },
            { path: '**', redirectTo: 'cartes_inclusif' }  // Rediriger les routes invalides
          ]},
        {path:'solutions', component:SolutionsComponent,children : [
          { path: '', redirectTo: '0', pathMatch: 'full' }
        ]},
        { path: '**',
            redirectTo: 'homepage',
            pathMatch: 'full'},
    { path: '**',
        redirectTo: 'homepage',
        pathMatch: 'full'
      },
    

];
