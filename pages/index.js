import Menu from '../components/Menu'
import Contato from '../components/Slides/Contato'
import Cultura from '../components/Slides/Cultura'
import Equipe from '../components/Slides/Equipe'
import Metodologia from '../components/Slides/Metodologia'
import Tecnologias from '../components/Slides/Tecnologias'
import SlideHome from '../components/Slides/Home'

export default () => (
  <div>
    <Menu />
    <SlideHome />
    <Metodologia />
    <Tecnologias />
    <Cultura />
    <Equipe />
    <Contato />
  </div>
)