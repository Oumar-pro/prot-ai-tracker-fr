import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Flame, Minus, Plus, Info, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface FoodAnalysisResult {
  name: string
  ingredients: string[]
  nutritionalInfo: {
    calories: number
    proteins: number
    carbs: number
    fats: number
    fiber: number
    sugar: number
  }
  portion: {
    size: string
    weight: number
  }
  healthScore: number
  recommendations: string[]
  allergies: string[]
  confidence: number
  imageUrl?: string
}

export default function FoodAnalysisDisplay({ data }: { data: FoodAnalysisResult }) {
  const [portionCount, setPortionCount] = useState(1)

  const increment = () => setPortionCount((p) => p + 1)
  const decrement = () => setPortionCount((p) => (p > 1 ? p - 1 : 1))

  return (
    <Card className="max-w-xl w-full mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-6">
      {/* Image du plat */}
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-48 object-cover rounded-xl shadow-sm"
        />
      )}

      {/* Nom du plat */}
      <h2 className="text-2xl font-bold text-center">{data.name}</h2>

      {/* Score santé */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Score Santé</span>
          <span>{data.healthScore}%</span>
        </div>
        <Progress
          value={data.healthScore}
          className="h-3 rounded-full"
          style={{
            background: `linear-gradient(to right, ${
              data.healthScore > 75 ? "#22c55e" : data.healthScore > 50 ? "#eab308" : "#ef4444"
            } ${data.healthScore}%, transparent 0%)`,
          }}
        />
      </div>

      {/* Nutriments */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm">
        {Object.entries(data.nutritionalInfo).map(([key, value]) => (
          <div key={key} className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-3">
            <p className="text-xs capitalize text-muted-foreground">{key}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Portion */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" size="sm" onClick={decrement} className="rounded-full border">
          <Minus />
        </Button>
        <span className="text-sm font-medium">
          Portion : {portionCount}x ({data.portion.weight * portionCount}g)
        </span>
        <Button variant="ghost" size="sm" onClick={increment} className="rounded-full border">
          <Plus />
        </Button>
      </div>

      {/* Allergies */}
      {data.allergies.length > 0 && (
        <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <AlertCircle className="text-red-500 mt-1" />
          <div>
            <h3 className="text-sm font-semibold">Allergènes détectés :</h3>
            <ul className="text-sm list-disc list-inside text-red-600 dark:text-red-400">
              {data.allergies.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Recommandations */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Info className="w-4 h-4" /> Recommandations santé
        </h3>
        <ul className="text-sm list-disc list-inside text-muted-foreground">
          {data.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </Card>
  )
      }
