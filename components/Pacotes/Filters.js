import React from 'react'
import {map, orderBy, pull, union} from 'lodash'

import {doAnalyze} from '../../service/actions'

const FavIcon = () => <i className="material-icons">favorite</i>
const ComIcon = () => <i className="material-icons">commute</i>
const AssIcon = () => <i className="material-icons">assignment</i>
const BokIcon = () => <i className="material-icons">book</i>

export default ({filters}) => {
  const {EXAMES, FILMES, LINHAS} = filters
  const [SELECTED, setSelected] = React.useState({EXAME: [], FILME: [], LINHA: []})
  const [RESULTADO, setResultado] = React.useState({})
  const [UPDATED, setUpdated] = React.useState(false)
  React.useEffect(() => {
    doAnalyze(SELECTED, (result) => {
      if(!result.resume) {
        setResultado([])
      } else {
        setResultado(result.resume)
      }
    })
  }, [UPDATED])
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
  const Calcular = () => {
    const ItemFilmes = () => map(SELECTED["FILME"], (item, key) => <li className="FILME" onClick={() => handleChange(item, "FILME")} key={key}><AssIcon /> {item}</li>)
    const ItemLinhas = () => map(SELECTED["LINHA"], (item, key) => <li className="LINHA" onClick={() => handleChangeOne(item, "LINHA")} key={key}><ComIcon /> {item}</li>)
    const ItemExames = () => map(SELECTED["EXAME"], (item, key) => <li className="EXAME" onClick={() => handleChangeOne(item, "EXAME")} key={key}><BokIcon /> {item}</li>)
    const Resultado = () => {
      // if(!RESULTADO || !RESULTADO.desvios) return false
      const {specs, desvios, cpcpk} = RESULTADO
      return (
        <>
          <li>Len: {desvios && desvios.TOTAL_ITEMS}</li>
          <li>Alv: {specs && specs.ALVO}</li>
          <li>Min: {specs && specs.MIN}</li>
          <li>Max: {specs && specs.MAX}</li>
          <li>&nbsp;DP: {desvios && desvios.DESVIO_PADRAO}</li>
          <li>&nbsp;DD: {desvios && desvios.DESVIO_DENTRO}</li>
          <li>&nbsp;PP: {cpcpk && cpcpk.PP}</li>
          <li>PPK: {cpcpk && cpcpk.PPK}</li>
          <li>&nbsp;CP: {cpcpk && cpcpk.CP}</li>
          <li>CPK: {cpcpk && cpcpk.CPK}</li>
        </>
      )
    }
    return (
      <div className="ResultadosBox">
        <h3>RESULTADOS</h3>
        <ul>
          <ItemFilmes />
          <ItemLinhas />
          <ItemExames />
          <Resultado />
        </ul>
        {/* <div className="ButtonCalculate" onClick={() => }><p>CALCULAR</p></div> */}
      </div>
    )
  }
  return (
    <div className='GroupDivisor'>
      <div>
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
      </div>
      <div>
        <div className='FieldSearch Exames'>
          <h3>EXAMES</h3>
          <ul>
            <li onClick={() => handleChange("NENHUM", "EXAME")}>NENHUM</li>
            {map(EXAMES, (EXAME, key) => {
              let isSelected = SELECTED["EXAME"].indexOf(EXAME) !== -1
              return <li className={isSelected ? `selected` : ``} key={key} onClick={() => handleChangeOne(EXAME, "EXAME")}>{EXAME}</li>
            })}
          </ul>
        </div>
      </div>
      <div>
        <Calcular />
      </div>
    </div>
  )
}