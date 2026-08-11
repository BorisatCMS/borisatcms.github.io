import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import { componentRegistry } from "../registry"
import CardGridConstructor from "../CardGrid"
import SocialLinksConstructor from "../SocialLinks"
import ContentMetaConstructor from "../ContentMeta"
import VisitHistoryConstructor from "../VisitHistory"
import TocToggleConstructor from "../TocToggle"

const Header = HeaderConstructor()
const CardGrid = CardGridConstructor()
const SocialLinks = SocialLinksConstructor()
const ContentMeta = ContentMetaConstructor()
const VisitHistory = VisitHistoryConstructor()
const TocToggle = TocToggleConstructor()
componentRegistry.register("CardGrid", CardGridConstructor, "core")
componentRegistry.register("SocialLinks", SocialLinksConstructor, "core")
componentRegistry.register("ContentMeta", ContentMetaConstructor, "core")
componentRegistry.register("VisitHistory", VisitHistoryConstructor, "core")
componentRegistry.register("TocToggle", TocToggleConstructor, "core")

/**
 * The default page frame — three-column layout with left sidebar, center
 * content (header + body + afterBody), and right sidebar, followed by a footer.
 *
 * This is the original Quartz layout, extracted from renderPage.tsx.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer: Footer,
  }: PageFrameProps) {
    return (
      <>
        <div class="left sidebar">
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
          <TocToggle {...componentData} />
        </div>
        <div class="center">
          <div class="page-header">
            <Header {...componentData}>
              {header.map((HeaderComponent) => (
                <HeaderComponent {...componentData} />
              ))}
            </Header>
            <div class="popover-hint">
              <VisitHistory {...componentData} />
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
              <ContentMeta {...componentData} />
            </div>
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
          <CardGrid {...componentData} />
        </div>
        <div class="right sidebar">
          {right.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <Footer {...componentData} />
        <SocialLinks {...componentData} />
      </>
    )
  },
}
