import { Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component'
import { ContexteComponent } from './views/contexte/contexte.component';
import { RulesComponent } from './views/rules/rules.component';
import { RulesAnalysisComponent } from './views/rules-analysis/rules-analysis.component';
import { RulesConclusionComponent } from './views/rules-conclusion/rules-conclusion.component';
import { RulesRepartitionComponent } from './views/rules-repartition/rules-repartition.component';
import { RulesSolutionsComponent } from './views/rules-solutions/rules-solutions.component';
import { UserManagerComponent } from './views/user-manager/user-manager.component';
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
