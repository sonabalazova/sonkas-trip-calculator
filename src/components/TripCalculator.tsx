import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car, Calculator, Users, Fuel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculationResults {
  fuelConsumption: number;
  totalCost: number;
  costPerPerson: number;
}

const TripCalculator = () => {
  const [kilometers, setKilometers] = useState<string>("");
  const [pricePerLiter, setPricePerLiter] = useState<string>("");
  const [consumptionPer100km, setConsumptionPer100km] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const { toast } = useToast();

  const calculateCosts = () => {
    const km = parseFloat(kilometers);
    const price = parseFloat(pricePerLiter);
    const consumption = parseFloat(consumptionPer100km);
    const people = parseInt(numberOfPeople);

    // Validation
    if (isNaN(km) || isNaN(price) || isNaN(consumption) || isNaN(people)) {
      toast({
        title: "Chyba vstupu",
        description: "Prosím vyplňte všetky polia správnymi číslami.",
        variant: "destructive",
      });
      return;
    }

    if (km <= 0 || price <= 0 || consumption <= 0 || people <= 0) {
      toast({
        title: "Neplatné hodnoty",
        description: "Všetky hodnoty musia byť väčšie ako nula.",
        variant: "destructive",
      });
      return;
    }

    // Calculations
    const fuelConsumption = (km / 100) * consumption;
    const totalCost = fuelConsumption * price;
    const costPerPerson = totalCost / people;

    setResults({
      fuelConsumption,
      totalCost,
      costPerPerson,
    });

    toast({
      title: "Výpočet dokončený",
      description: "Cena cesty bola úspešne vypočítaná!",
    });
  };

  const resetForm = () => {
    setKilometers("");
    setPricePerLiter("");
    setConsumptionPer100km("");
    setNumberOfPeople("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Form */}
      <Card className="border-automotive-blue/20 shadow-automotive">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-automotive-dark">
            <Calculator className="w-6 h-6 text-primary" />
            Kalkulačka ceny cesty
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="kilometers" className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Počet kilometrov
              </Label>
              <Input
                id="kilometers"
                type="number"
                placeholder="napr. 250"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
              <p className="text-sm text-muted-foreground">km</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerLiter" className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-accent" />
                Cena za 1 liter
              </Label>
              <Input
                id="pricePerLiter"
                type="number"
                step="0.01"
                placeholder="napr. 1.45"
                value={pricePerLiter}
                onChange={(e) => setPricePerLiter(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
              <p className="text-sm text-muted-foreground">€/liter</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="consumption" className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-accent" />
                Spotreba na 100 km
              </Label>
              <Input
                id="consumption"
                type="number"
                step="0.1"
                placeholder="napr. 7.5"
                value={consumptionPer100km}
                onChange={(e) => setConsumptionPer100km(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
              <p className="text-sm text-muted-foreground">litrov/100 km</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="people" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Počet ľudí v aute
              </Label>
              <Input
                id="people"
                type="number"
                min="1"
                placeholder="napr. 4"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
              <p className="text-sm text-muted-foreground">osôb</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={calculateCosts} 
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Vypočítať
            </Button>
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Vymazať
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardHeader>
            <CardTitle className="text-xl text-automotive-dark text-center">
              Výsledky výpočtu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg border border-primary/20 text-center">
                <h3 className="font-semibold text-primary mb-2">Spotreba na trasu</h3>
                <p className="text-2xl font-bold text-automotive-dark">
                  {results.fuelConsumption.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">litrov</p>
              </div>

              <div className="bg-card p-4 rounded-lg border border-accent/20 text-center">
                <h3 className="font-semibold text-accent mb-2">Cena za celú cestu</h3>
                <p className="text-2xl font-bold text-automotive-dark">
                  {results.totalCost.toFixed(2)} €
                </p>
                <p className="text-sm text-muted-foreground">celkom</p>
              </div>

              <div className="bg-card p-4 rounded-lg border border-primary/20 text-center">
                <h3 className="font-semibold text-primary mb-2">Cena na osobu</h3>
                <p className="text-2xl font-bold text-automotive-dark">
                  {results.costPerPerson.toFixed(2)} €
                </p>
                <p className="text-sm text-muted-foreground">na osobu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TripCalculator;