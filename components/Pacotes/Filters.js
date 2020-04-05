import React from 'react'
import {map, pull} from 'lodash'
import ExameFinal from './Exame'

export default ({children, filters, forceUpdate}) => {
  const {DATE, EXAMES, FILMES, LINHAS} = filters
  const [SELECTED, setSelected] = React.useState({EXAME: [], FILME: [], LINHA: []})
  const [UPDATED, setUpdated] = React.useState(false)
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
  const RenderExames = () => map(SELECTED.EXAME, (EXAME) => <ExameFinal DATE={DATE} EXAME={EXAME} SELECTED={SELECTED} HANDLE={{handleChange, handleChangeOne}} />)
  return (
    <React.Fragment>
      <div className='GroupDivisor'>
        {children}
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
        <div className='FieldSearch Linhas'>
          <h3>LINHAS</h3>
          <ul>
            <li onClick={() => handleChange("NENHUM", "LINHA")}>NENHUM</li>
            {map(LINHAS, (LINHA, key) => {
              let isSelected = SELECTED["LINHA"].indexOf(LINHA) !== -1
              return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChangeOne(LINHA, "LINHA")}>{LINHA}</li>
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
      <RenderExames />
    </React.Fragment>
  )
}