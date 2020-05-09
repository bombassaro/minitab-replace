import React from 'react'
import {Frame} from 'xprog-ds'
import Footer from './Footer'
import Topbar from './Topbar'

const Example = () => {
  const {
    Block,
    ButtonPrimary,
    Card,
    Container,
    FX, FY,
    FlexEnd,
    ListView,
    Slide,
    SlideTitle,
    SlideText
  } = Frame

  return (
    <Container>
      <Topbar />
      <Slide>
        <FY>
          <ListView>
            <FY>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </FY>
          </ListView>
          <FlexEnd>
            <ButtonPrimary goTo={'/frames/filter'} />
          </FlexEnd>
        </FY>
      </Slide>
      <Footer />
    </Container>
  )
}

export default Example