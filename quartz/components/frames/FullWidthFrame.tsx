import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import { componentRegistry } from "../registry"
import CardGridConstructor from "../CardGrid"
import SocialLinksConstructor from "../SocialLinks"
import ContentMetaConstructor from "../ContentMeta"
import VisitHistoryConstructor from "../VisitHistory"
import LanguageSwitcherConstructor from "../LanguageSwitcher"

const Header = HeaderConstructor()
const CardGrid = CardGridConstructor()
const SocialLinks = SocialLinksConstructor()
const ContentMeta = ContentMetaConstructor()
const VisitHistory = VisitHistoryConstructor()
const LanguageSwitcher = LanguageSwitcherConstructor()
componentRegistry.register("CardGrid", CardGridConstructor, "core")
componentRegistry.register("SocialLinks", SocialLinksConstructor, "core")
componentRegistry.register("ContentMeta", ContentMetaConstructor, "core")
componentRegistry.register("VisitHistory", VisitHistoryConstructor, "core")
componentRegistry.register("LanguageSwitcher", LanguageSwitcherConstructor, "core")

/**
 * Full-width page frame — no sidebars. The center content area spans the
 * full width of the page. Header, beforeBody, body, afterBody, and footer
 * are all rendered in a single column.
 *
 * Useful for page types like Canvas, presentations, or dashboards that
 * need maximum horizontal space.
 */
export const FullWidthFrame: PageFrame = {
  name: "full-width",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    footer: Footer,
  }: PageFrameProps) {
    return (
      <>
        <div class="center full-width">
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
        <Footer {...componentData} />
        <SocialLinks {...componentData} />
        <LanguageSwitcher {...componentData} />
      </>
    )
  },
}
