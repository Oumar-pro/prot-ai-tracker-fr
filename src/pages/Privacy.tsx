import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
        
        <h1 className="text-lg font-semibold text-foreground">Confidentialité</h1>
        
        <div className="w-10 h-10" />
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">POLITIQUE DE CONFIDENTIALITÉ</h1>
            <p className="text-muted-foreground">Dernière mise à jour : 25 juillet 2025</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Responsable du traitement</h2>
            <div className="text-muted-foreground leading-relaxed">
              <p>Le traitement des données est effectué par :</p>
              <p>Nom : Oumar Moutari<br />
              Email : support@protai.app</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Données collectées</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Les données personnelles suivantes peuvent être collectées :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nom, prénom, email, Poids, taille</li>
                <li>Informations de paiement (via un prestataire sécurisé externe)</li>
                <li>Données d'usage de l'application</li>
                <li>Adresse IP et informations de navigation</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Finalité du traitement</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Les données sont collectées pour :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fournir l'accès au service</li>
                <li>Gérer la facturation</li>
                <li>Améliorer l'expérience utilisateur</li>
                <li>Répondre aux obligations légales (RGPD, sécurité, etc.)</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Base légale</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Le traitement est fondé sur :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Le consentement (inscription, envoi d'emails, etc.)</li>
                <li>L'exécution contractuelle (accès au service)</li>
                <li>Les obligations légales</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Destinataires</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Les données ne sont jamais revendues. Elles peuvent être transmises uniquement à :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Prestataires techniques (hébergement, analyse, paiement)</li>
                <li>Autorités compétentes en cas d'obligation légale</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Conservation des données</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Les données sont conservées :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Le temps nécessaire à la fourniture du service</li>
                <li>Puis archivées ou supprimées conformément au RGPD</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Droits des utilisateurs</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accès, rectification, suppression</li>
                <li>Portabilité</li>
                <li>Limitation ou opposition au traitement</li>
                <li>Retrait du consentement à tout moment</li>
              </ul>
              <p className="mt-3">Pour exercer ces droits, écrivez à : support@protai.app</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Sécurité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Des mesures techniques et organisationnelles sont mises en place pour protéger vos données contre tout accès non autorisé.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">9. Cookies</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Le service peut utiliser des cookies pour :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Mesurer l'audience</li>
                <li>Améliorer la navigation</li>
                <li>Suivre les préférences</li>
              </ul>
              <p className="mt-3">Vous pouvez refuser les cookies via les paramètres de votre navigateur ou une bannière prévue à cet effet.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">10. Transferts internationaux</h2>
            <p className="text-muted-foreground leading-relaxed">
              Certaines données peuvent être transférées hors de l'Union européenne via des prestataires (ex : Stripe, Google, etc.). Ces transferts respectent les règles du RGPD (clauses contractuelles types, etc.).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;