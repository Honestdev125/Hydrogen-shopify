import { Card, CardContent } from "~/components/ui/card"

export function HomeRankingSection() {
  return (
    <div className="px-4">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2>{"ランキング"}</h2>
        </CardContent>
      </Card>
    </div>
  )
}
