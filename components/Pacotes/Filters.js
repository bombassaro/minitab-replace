import React from 'react'
import {map, pull} from 'lodash'
import ExameFinal from './Exame'
import RelatAcomp from './RelatAcomp'
import RelatEstat from './RelatEstat'
import {doReport} from '../../service/actions'

export default ({children, filters, forceUpdate, isOpen}) => {
  const {DATE, EXAMES, FILMES, LINHAS} = filters
  const [LOADING, setLoading] = React.useState(true)
  const [SELECTED, setSelected] = React.useState({EXAME: ["ALONGAMENTO DM"], FILME: ["15TSY32MR"], LINHA: [1]})
  // const [SELECTED, setSelected] = React.useState({EXAME: [], FILME: [], LINHA: []})
  const [UPDATED, setUpdated] = React.useState(false)
  const [RESULTADO, setResultado] = React.useState({})
  const handleChange = (value, group) => {
    const payload = SELECTED
    const reset = () => {
      payload[group] = []
      setSelected(payload)
      setUpdated(!UPDATED)
      return true
    }
    if(value === "NENHUM") return reset()
    pull(payload[group], "NENHUM")
    if(payload[group].indexOf(value) === -1) {
      payload[group].push(value)
    } else {
      pull(payload[group], value)
    }
    setSelected(payload)
    setUpdated(!UPDATED)
  }
  const handleChangeOne = (value, group) => {
    const payload = SELECTED
    if(payload[group].indexOf(value) === -1) {
      payload[group] = [value]
    } else {
      payload[group] = []
    }
    setSelected(payload)
    setUpdated(!UPDATED)
  }

  React.useEffect(() => {
    setLoading(true)
    const FILTER = {
      DATE,
      EXAME: SELECTED.EXAME,
      FILME: SELECTED.FILME,
      LINHA: SELECTED.LINHA
    }
    doReport(FILTER, (result) => {
      setResultado(result)
      setLoading(false)
    })
  }, [DATE, UPDATED])

  const RenderExames = () => map(RESULTADO, (RESULT) => <ExameFinal RESULT={RESULT} SELECTED={SELECTED} HANDLE={{handleChange, handleChangeOne}} />)
  return (
    <React.Fragment>
      <div className={`MainFilter ${isOpen ? `opened` : ``}`}>
        <div className={`Wrap`}>
          <div className='FieldSearch Linhas'>
            {children}
            <h3>LINHAS</h3>
            <ul>
              <li onClick={() => handleChange("NENHUM", "LINHA")}>NENHUM</li>
              {map(LINHAS, (LINHA, key) => {
                let isSelected = SELECTED["LINHA"].indexOf(LINHA) !== -1
                return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChangeOne(LINHA, "LINHA")}>{LINHA}</li>
              })}
            </ul>
          </div>
          <div className='FieldSearch Filmes'>
            <h3>FILMES</h3>
            <ul>
              <li onClick={() => handleChange("NENHUM", "FILME")}>NENHUM</li>
              {map(FILMES, (FILME, key) => {
                let isSelected = SELECTED["FILME"].indexOf(FILME) !== -1
                return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChangeOne(FILME, "FILME")}>{FILME}</li>
              })}
            </ul>
          </div>
          <div className='FieldSearch Exames'>
            <h3>EXAMES</h3>
            <ul>
              <li onClick={() => handleChange("NENHUM", "EXAME")}>NENHUM</li>
              {map(EXAMES, (EXAME, key) => {
                let isSelected = SELECTED["EXAME"].indexOf(EXAME) !== -1
                return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChange(EXAME, "EXAME")}>{EXAME}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
      {LOADING ? 
        <div className='GroupExameFinal'><pre>Loading</pre></div> : (
        <div className='MainBody'>
          <RelatAcomp RESULTADO={RESULTADO} />
          <RelatEstat RESULTADO={RESULTADO} />
          <RenderExames />
        </div>
      )}
    </React.Fragment>
  )
}