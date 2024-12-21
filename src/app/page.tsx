import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getHeroes } from "@/services/opendota";
import Image from "next/image";

export default async function Home() {
  const heroes = await getHeroes()

  const getAttrColor = (attr: string) => {
    switch (attr.toLowerCase()) {
      case "agi":
        return "bg-emerald-500"
      case "str":
        return "bg-red-500"
      case "int":
        return "bg-blue-500"
      default:
        return "bg-purple-500"
    }
  }


  return (
    <div className="md:container mx-auto my-4">
      <h1 className="text-center text-2xl text-white font-bold mb-6">Dota 2 Heroes Stats</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {heroes.map((hero, i) => (
          <Card key={i} className="relative h-[350px] w-[300px] overflow-hidden rounded-lg transition-all duration-700 ease-out hover:scale-105 border-slate-500">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ backgroundImage: `url(${`http://cdn.dota2.com/${hero.img}`})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
            <div className="relative h-full flex flex-col justify-end p-4">
              <Badge className={cn("absolute top-4 right-4 uppercase font-bold", getAttrColor(hero.primary_attr))}>
                {hero.primary_attr}
              </Badge>
              <div className="transform transition-all duration-700">
                <h2 className="text-2xl fond-bold text-white mb-2">
                  {hero.localized_name}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hero.roles.map((role) => (
                  <Badge key={role} variant={"outline"} className="text-xs text-slate-300 border-slate-300">{role}</Badge>
                ))}
              </div>
              <p className="text-sm text-white transform translate-y-4 mb-4">
                {hero.attack_type}
              </p>
              <div className="absolute inset-0 transition-opacity duration-700 bg-gradient-to-t from-primary/20 to-primary/5" />
            </div>
          </Card>
        ))}

      </div>
    </div>
  );
}
