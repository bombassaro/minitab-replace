import React from 'react'
import {map, orderBy, pull, union} from 'lodash'
import {
  loadEspcfcc,
  loadPacotes
} from '../../service/actions'
import Filters from './Filters'

export default () => {
  const [inited, setInited] = React.useState(false)
  const [ESPCFCC, setEspcfcc] = React.useState([])
  const [PACOTES, setPacotes] = React.useState([])
  const [PACOTEX, setPacoteX] = React.useState([])
  const [UPDATED, setUpdated] = React.useState(false)
  const handleEspcfcc = () => loadEspcfcc((items) => setEspcfcc(items))
  const handlePacotes = () => loadPacotes((items) => setPacotes(items))
  let EXAMES = []
  let FILMES = []
  let LINHAS = []
  React.useEffect(() => {
    if(!inited) {
      handleEspcfcc()
      handlePacotes()
      setInited(true)
    }
    // console.log(`PACOTEX`, PACOTEX)
  }, [inited, UPDATED])
  
  map(PACOTES, (item) => {
    if(PACOTEX.indexOf(item._id) > -1) {
      map(item.EXAME, (item) => EXAMES.push(item))
      map(item.FILME, (item) => FILMES.push(item))
      map(item.LINHA, (item) => LINHAS.push(item))
    }
  })
  EXAMES = orderBy(union(EXAMES))
  FILMES = orderBy(union(FILMES))
  LINHAS = orderBy(union(LINHAS))
  const handleChange = (value) => {
    const payload = PACOTEX
    const reset = () => {
      // PACOTEX = ["NENHUM"]
      setPacoteX([])
      setUpdated(!UPDATED)
      return true
    }
    if(value === "NENHUM") return reset()
    pull(PACOTEX, "NENHUM")
    if(PACOTEX.indexOf(value) === -1) {
      PACOTEX.push(value)
    } else {
      pull(PACOTEX, value)
    }
    setPacoteX(payload)
    setUpdated(!UPDATED)
  }
  const Pacotes = () => {
    return (
      <div className='GroupDivisor'>
        <div>
          <div className='FieldSearch Pacotes'>
            <h3>PACOTES</h3>
            <ul>
              <li onClick={() => handleChange("NENHUM")}>NENHUM</li>
              {map(PACOTES, (PACOTE, key) => {
                let isSelected = PACOTEX.indexOf(PACOTE._id) !== -1
                return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChange(PACOTE._id)}>{PACOTE.ARQUIVO}</li>
              })}
            </ul>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
  return (
    <div className="MainPacotes">
      <Pacotes />
      <Filters filters={{EXAMES, FILMES, LINHAS}} />
    </div>
  )
}