import { Card, CardContent } from "~/components/ui/card"

export function HomeVirtualSection() {
  return (
    <div className="px-4">
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2>{"バーチャル試着"}</h2>
        </CardContent>
      </Card>
    </div>
  )
}
