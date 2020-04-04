import React from 'react'
import {format, getTime, subWeeks} from 'date-fns'
import InputMask from 'react-input-mask'
import {map, orderBy, pull, union} from 'lodash'
import {
  loadEspcfcc,
  loadExames,
  // loadPacotes
} from '../../service/actions'
import Filters from './Filters'

export default () => {
  const dateStart = format(subWeeks(new Date(), 2), 'dd/MM/yyyy') 
  const dateEnd = format(new Date(), 'dd/MM/yyyy') 
  const [inited, setInited] = React.useState(false)
  const [DTFLTRS, setDtFltrS] = React.useState(dateStart)
  const [DTFLTRE, setDtFltrE] = React.useState(dateEnd)
  const [ESPCFCC, setEspcfcc] = React.useState([])
  const [CONTENT, setContent] = React.useState([])
  // const [PACOTES, setPacotes] = React.useState([])
  // const [PACOTEX, setPacoteX] = React.useState([])
  const [UPDATED, setUpdated] = React.useState(false)
  const handleEspcfcc = () => loadEspcfcc((items) => setEspcfcc(items))
  // const handlePacotes = () => loadPacotes((items) => setPacotes(items))
  let EXAMES = []
  let FILMES = []
  let LINHAS = []
  React.useEffect(() => {
    if(!inited) {
      handleEspcfcc()
      // handleExames()
      // handlePacotes()
      setInited(true)
    }
    // console.log(`PACOTEX`, PACOTEX)
  }, [inited, UPDATED])
  
  map(CONTENT, ({EXAME, LINHA, FILME}) => {
    EXAMES.push(EXAME)
    FILMES.push(FILME)
    LINHAS.push(LINHA)
    // if(CONTENT.indexOf(item._id) > -1) {
      // map(item.EXAME, (item) => EXAMES.push(item))
      // map(item.FILME, (item) => FILMES.push(item))
      // map(item.LINHA, (item) => LINHAS.push(item))
    // }
  })
  EXAMES = orderBy(union(EXAMES))
  FILMES = orderBy(union(FILMES))
  LINHAS = orderBy(union(LINHAS))
  const handleFilterClick = () => {
    // setDtFltrS(target.value)
    const sSD = DTFLTRS.split("/")
    const sED = DTFLTRE.split("/")
    const nSD = sSD.length > 1 ? new Date(parseInt(sSD[2]), parseInt(sSD[1]) - 1, parseInt(sSD[0])) : null
    const nED = sED.length > 1 ? new Date(parseInt(sED[2]), parseInt(sED[1]) - 1, parseInt(sED[0])) : null
    nED.setHours(20)
    const filters = {"DATE": {"$gte": getTime(nSD), "$lt": getTime(nED)}}
    loadExames(filters, (items) => setContent(items))
    // setInited(false)
  }
  // const handleChange = (value) => {
  //   const payload = PACOTEX
  //   const reset = () => {
  //     // PACOTEX = ["NENHUM"]
  //     setPacoteX([])
  //     setUpdated(!UPDATED)
  //     return true
  //   }
  //   if(value === "NENHUM") return reset()
  //   pull(PACOTEX, "NENHUM")
  //   if(PACOTEX.indexOf(value) === -1) {
  //     PACOTEX.push(value)
  //   } else {
  //     pull(PACOTEX, value)
  //   }
  //   setPacoteX(payload)
  //   setUpdated(!UPDATED)
  // }
  return (
    <div className="MainPacotes">
      <div className='GroupDivisor'>
        <div>
          <div className='FieldSearch Pacotes'>
            <h3>PACOTES</h3>
            <InputMask mask="99/99/9999" defaultValue={DTFLTRS} onChange={({target}) => setDtFltrS(target.value)} />
            <InputMask mask="99/99/9999" defaultValue={DTFLTRE} onChange={({target}) => setDtFltrE(target.value)} />
            {/* <ul>
              <li onClick={() => handleChange("NENHUM")}>NENHUM</li>
              {map(PACOTES, (PACOTE, key) => {
                let isSelected = PACOTEX.indexOf(PACOTE._id) !== -1
                return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChange(PACOTE._id)}>{PACOTE.ARQUIVO}</li>
              })}
            </ul> */}
            <div className="ButtonCalculate" onClick={() => handleFilterClick()}><p>FILTRAR</p></div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Filters filters={{EXAMES, FILMES, LINHAS}} />
    </div>
  )
}