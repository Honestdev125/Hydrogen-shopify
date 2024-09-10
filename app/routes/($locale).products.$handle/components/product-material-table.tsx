import { Card } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table"

export function ProductMaterialTable() {
  return (
    <Card>
      <Table className="text-xs">
        <TableBody>
          <TableRow>
            <TableCell className="bg-neutral-100">{"素材"}</TableCell>
            <TableCell>{"ポリエステル100%"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-neutral-100">{"原産国"}</TableCell>
            <TableCell>{"中国"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-neutral-100">{"お手入れ"}</TableCell>
            <TableCell>{"洗濯機洗い可能"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
