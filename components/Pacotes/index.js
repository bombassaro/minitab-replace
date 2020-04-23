import React from 'react'
import {format, getTime, subHours, setHours, subWeeks} from 'date-fns'
import InputMask from 'react-input-mask'
import {map, orderBy, pull, union} from 'lodash'
import {
  loadEspcfcc,
  loadExames,
  // loadPacotes
} from '../../service/actions'
import Filters from './Filters'

export default () => {
  const dateStart = format(subWeeks(new Date(2020, 0, 1), 2), 'dd/MM/yyyy') 
  const dateEnd = format(new Date(2020, 1, 2), 'dd/MM/yyyy') 
  const [inited, setInited] = React.useState(false)
  const [DTFLTRS, setDtFltrS] = React.useState(dateStart)
  const [DTFLTRE, setDtFltrE] = React.useState(dateEnd)
  const [ESPCFCC, setEspcfcc] = React.useState([])
  const [CONTENT, setContent] = React.useState([])
  const [FILTERS, setFilters] = React.useState({})
  const [LOADING, setLoading] = React.useState(true)
  // const [PACOTES, setPacotes] = React.useState([])
  // const [PACOTEX, setPacoteX] = React.useState([])
  const [UPDATED, setUpdated] = React.useState(false)
  const handleEspcfcc = () => loadEspcfcc((items) => {
    setEspcfcc(items)
    setLoading(false)
  })
  // const handlePacotes = () => loadPacotes((items) => setPacotes(items))
  let EXAMES = []
  let FILMES = []
  let LINHAS = []
  React.useEffect(() => {
    if(!inited) {
      handleEspcfcc()
      setInited(true)
    }
  }, [inited, UPDATED])
  
  map(CONTENT, ({EXAME, LINHA, FILME}) => {
    EXAMES.push(EXAME)
    FILMES.push(FILME)
    LINHAS.push(LINHA)
  })
  EXAMES = orderBy(union(EXAMES))
  FILMES = orderBy(union(FILMES))
  LINHAS = orderBy(union(LINHAS))

  const handleFilterClick = () => {
    setLoading(true)
    const sSD = DTFLTRS.split("/")
    const sED = DTFLTRE.split("/")
    let nSD = sSD.length > 1 ? new Date(parseInt(sSD[2]), parseInt(sSD[1]) - 1, parseInt(sSD[0])) : null
    let nED = sED.length > 1 ? new Date(parseInt(sED[2]), parseInt(sED[1]) - 1, parseInt(sED[0])) : null
    const _filt = {"DATE": {"$gte": getTime(nSD), "$lt": getTime(nED)}}
    loadExames(_filt, (items) => {
      setContent(items)
      setFilters(_filt)
      setUpdated(!UPDATED)
      setLoading(false)      
    })
  }
  return (
    <div className={`MainPacotes ${LOADING ? `loading` : ``}`}>
      <Filters filters={{...FILTERS, EXAMES, FILMES, LINHAS}} forceUpdate={!LOADING}>
        <div className='FieldSearch Pacotes'>
          <h3>FILTROS</h3>
          <InputMask mask="99/99/9999" defaultValue={DTFLTRS} onChange={({target}) => setDtFltrS(target.value)} /><br />
          <InputMask mask="99/99/9999" defaultValue={DTFLTRE} onChange={({target}) => setDtFltrE(target.value)} />
          <div className="ButtonCalculate" onClick={() => handleFilterClick()}><p>PESQUISAR</p></div>
        </div>
      </Filters>
    </div>
  )
}