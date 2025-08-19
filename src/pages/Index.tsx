import TripCalculator from "@/components/TripCalculator";
import { Car } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-automotive-light to-secondary">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sonkas ride
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-automotive-dark mb-4">
            Vypočítajte si cenu cesty
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jednoducho zadajte parametre vašej cesty a dozviete sa, koľko vás bude stáť palivo na osobu.
          </p>
        </div>

        <TripCalculator />
      </main>

      {/* Footer */}
      <footer className="bg-automotive-dark text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="w-5 h-5" />
            <span className="font-semibold">Sonkas ride</span>
          </div>
          <p className="text-white/80">
            Kalkulačka ceny cesty - Vypočítajte si náklady na palivo jednoducho a rýchlo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
