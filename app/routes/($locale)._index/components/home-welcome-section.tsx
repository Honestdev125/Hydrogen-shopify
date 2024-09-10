import { Card, CardContent } from "~/components/ui/card"

export function HomeWelcomeSection() {
  return (
    <div className="px-4">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2>{"まずはお近くのUNINOVERSEへお気軽にお越しください"}</h2>
        </CardContent>
      </Card>
    </div>
  )
}
