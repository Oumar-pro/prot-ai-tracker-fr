import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 bg-background border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold text-foreground">CGU</h1>
        
        <div className="w-10 h-10" />
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">CONDITIONS GÉNÉRALES D'UTILISATION (CGU)</h1>
            <p className="text-muted-foreground">Dernière mise à jour : 25 juillet 2025</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Éditeur</h2>
            <p className="text-muted-foreground leading-relaxed">
              La présente application "Prot AI" est édité par Oumar Moutari, entrepreneur individuel.<br />
              Email de contact : support@protai.app
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Objet</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes CGU ont pour objet de définir les modalités d'accès et d'utilisation des services proposés par Prot AI.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Acceptation des conditions</h2>
            <p className="text-muted-foreground leading-relaxed">
              En accédant ou en utilisant les services de Prot AI, l'utilisateur reconnaît avoir lu, compris et accepté les présentes CGU sans réserve.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Accès au service</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                L'utilisateur bénéficie d'un accès gratuit aux fonctionnalités pendant 3 jours d'essai, à compter de l'inscription.
                À l'issue de cette période, l'accès complet au service nécessite un abonnement payant :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>3 € / mois (renouvelé automatiquement)</li>
                <li>30 € / an (renouvelé automatiquement)</li>
              </ul>
              <p>
                Le non-renouvellement entraîne la perte d'accès aux fonctionnalités premium.
              </p>
              <p>
                Nous nous réservons le droit de modifier, suspendre ou interrompre le service à tout moment sans préavis, notamment pour des raisons techniques ou légales.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tous les contenus (textes, images, logos, codes, interface) sont la propriété exclusive de Prot AI et ne peuvent être utilisés sans autorisation écrite préalable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Responsabilités</h2>
            <p className="text-muted-foreground leading-relaxed">
              Prot AI ne saurait être tenue pour responsable de tout dommage, direct ou indirect, résultant de l'utilisation du service, de l'indisponibilité temporaire ou permanente du service ou d'erreurs dans les données générées par l'IA.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Résiliation</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'utilisateur peut résilier son abonnement à tout moment depuis son compte. Aucun remboursement ne sera effectué pour les périodes entamées.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Loi applicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes CGU sont régies par le droit français et européen. En cas de litige, les tribunaux compétents seront ceux du ressort de l'éditeur, sauf disposition contraire imposée par la loi locale de l'utilisateur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;