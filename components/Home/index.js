import React from 'react'
import {Frame} from 'xprog-ds'
import Footer from './Footer'
import Topbar from './Topbar'
import Image06 from './Assets/undraw_video_call_kxyp.svg'
import Image05 from './Assets/undraw_process_e90d.svg'
import Image04 from './Assets/undraw_invest_88iw.svg'
import Image03 from './Assets/undraw_mathematics_4otb.svg'
import Image02 from './Assets/undraw_bear_market_ania.svg'
import Image01 from './Assets/undraw_progress_data_4ebj.svg'

const Example = () => {
  const {
    Block,
    ButtonPrimary,
    Container,
    Grid,
    FY, FX,
    FlexEnd,
    Slide,
    SlideText,
    SlideTitle,
    Text
  } = Frame

  let home = {
    title: {
      class: 'main-title',
      value: `Melhore sistematicamente os processos e elimine defeitos`
    },
    text: {
      class: 'main-lead',
      value: `Consultoria tecnológica para empresas implementarem sistemas de qualidade por meio de ferramentas integradas.`
    }
  }

  let needs1 = {
    title: {
      class: 'main-title',
      value: `Os sistemas da sua empresa não se comunicam?`
    },
    text: {
      class: 'main-lead',
      value: `A maioria dos sistemas e máquinas possuem API's para importar e exportar os dados gerados e armazenados.`
    },
    text2: {
      class: 'main-lead',
      value: `Utilize das tecnologias da informação para consolidar dados de sistemas e apresentar relatórios personalizados.`
    }
  }

  let needs2 = {
    title: {
      class: 'main-title',
      value: `Gastando muito tempo para consolidar relatórios?`
    },
    text: {
      class: 'main-lead',
      value: `Pessoas investem horas para formatar grandes volumes de dados não padronizados e alimentar planilhas.`
    },
    text2: {
      class: 'main-lead',
      value: `Elimine diversas licenças de softwares em troca de uma solução única, customizada e integrada.`
    }
  }

  let contato = {
    title: {
      class: 'main-title',
      value: 'Entre em contato e peça um orçamento'
    },
    text: {
      class: 'main-lead',
      value: `Apresente para nós os processos da sua empresa para elaborarmos um plano de ação e uma proposta.`
    }
  }

  const Card = props => {
    return (
      <div className={`fr-card`}>
      <div className={`fr-card-image`}>{props.image}</div>
      <div className={`fr-card-text`}>
        {props.children}
      </div>
    </div>
    )
  }

  return (
    <Container>
    <div className={`fr-topbar MainTopbar`}>
      <div className={`Wrap`}>
        <div className={`leftButton`}>
          <i className={`material-icons`}>timeline</i>
          <a className={`title`} href={`/`}>SYS SIGMA</a>
        </div>
        <div></div>
        <div className={`rightWrap`}>
          <div className={`rightButton`}>
            <a className={`filter`} href={`/demo`}>{`DEMONSTRAÇÃO`}</a>
            {/* <i className={`material-icons`}>{`import_export`}</i> */}
          </div>
        </div>
      </div>
    </div>
      <Slide class='fr-home'>
        <div class='home-intro'>
          <div class='home-slide'>
            <Text {...home.title} />
            <Text {...home.text} />
            {/* <Text value={`Titulo`} /> */}
            <div className={`home-button`}>
              <a className={``} href={`#about`}>SAIBA MAIS</a>
            </div>
          </div>
          <div className={`home-image`}>
            <Image01 />
          </div>
        </div>
        <FY>
          <Grid>
            <Card image={<Image03 />}>
              <p>Conheça o Six Sigma, método estatístico para melhorar processos</p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image05 />}>
              <p>Automatize e customize a elaboração dos seus Gráficos de Controle </p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image04 />}>
              <p>Adote o Sys Sigma e aumente a margem de lucro do seu negócio</p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
          </Grid>
        </FY>
      </Slide>
      <div id={`about`}>
        <Slide class='fr-black'>
          <FX>
            <FY>
              <Text {...needs1.title} />
              <Text {...needs1.text} />
              <div className={`needs-image`}>
                <img src={`/static/images/img_minitab3.png`} />
              </div>
              <Text {...needs1.text2} />
            </FY>
            <FY>
              <Text {...needs2.title} />
              <Text {...needs2.text} />
              <div className={`needs-image`}>
                <img src={`/static/images/img_minitab2.png`} />
              </div>
              <Text {...needs2.text2} />
            </FY>
          </FX>
        </Slide>
      </div>
      <Slide class='fr-service'>
        <FY>
          <Text {...home.title} />
          <Text {...home.text} />
          <Grid>
            <Card image={<Image03 />}>
              <p>Conheça o Six Sigma, método estatístico para melhorar processos</p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image04 />}>
              <p>Adote o Sys Sigma e aumente a margem de lucro do seu negócio</p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image05 />}>
              <p>Automatize e customize a elaboração dos seus Gráficos de Controle </p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image03 />}>
              <p>Conheça o Six Sigma, método estatístico para melhorar processos</p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image04 />}>
              <p>Adote o Sys Sigma e aumente a margem de lucro do seu negócio</p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
            <Card image={<Image05 />}>
              <p>Automatize e customize a elaboração dos seus Gráficos de Controle </p>
              <p>Método de redução contínua da variação nos processos, eliminando defeitos ou falhas nos produtos.</p>
            </Card>
          </Grid>
        </FY>
        <div class='home-intro'>
          <div class='home-slide'>
            <Text {...contato.title} />
            <Text {...contato.text} />
            {/* <Text value={`Titulo`} /> */}
            <div className={`home-button`}>
              <a className={``} href={`#about`}>TENHO INTERESSE</a>
            </div>
          </div>
          <div className={`home-image`}>
            <Image06 />
          </div>
        </div>
      </Slide>
      <Footer />
    </Container>
  )
}

export default Example;