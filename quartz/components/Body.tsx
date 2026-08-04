import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { componentRegistry } from "./registry"
import TickerConstructor from "./Ticker"
import CardGridConstructor from "./CardGrid"

const Ticker = TickerConstructor()
const CardGrid = CardGridConstructor()
componentRegistry.register("Ticker", TickerConstructor, "core")
componentRegistry.register("CardGrid", CardGridConstructor, "core")

const Body: QuartzComponent = (props: QuartzComponentProps) => {
  const { children } = props
  return (
    <div id="quartz-body">
      <Ticker {...props} />
      {children}
      <CardGrid {...props} />
    </div>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor
