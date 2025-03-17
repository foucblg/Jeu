import { Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component'
import { ContexteComponent } from './views/contexte/contexte.component';
import { RulesComponent } from './views/rules/rules.component';
import { RulesAnalysisComponent } from './views/rules-analysis/rules-analysis.component';
import { RulesConclusionComponent } from './views/rules-conclusion/rules-conclusion.component';
import { RulesRepartitionComponent } from './views/rules-repartition/rules-repartition.component';
import { RulesSolutionsComponent } from './views/rules-solutions/rules-solutions.component';
import { UserManagerComponent } from './views/user-manager/user-manager.component';
import { InclusifCardsComponent } from './views/inclusif-cards/inclusif-cards.component';
import { NavigationCardComponent } from './views/inclusif-cards/navigation-card/navigation-card.component';
import { SolutionsComponent } from './views/solutions/solutions.component';

export const routes: Routes = [
    {path: 'accueil', component: HomepageComponent},
    {path: 'contexte', component: ContexteComponent},
    {path: 'regles_analyse', component: RulesAnalysisComponent},
    {path: 'regles_conclusion', component: RulesConclusionComponent},
    {path: 'regles_repartition', component: RulesRepartitionComponent},
    {path: 'regles_solutions', component: RulesSolutionsComponent},
    {path: 'regles', component: RulesComponent},
    {path: 'enregistrement_utilisateur', component: UserManagerComponent},
    {path: 'solution', component:SolutionsComponent},
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
    { path: '**',
        redirectTo: 'accueil',
        pathMatch: 'full'
      },
      

];
