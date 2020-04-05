import React from 'react'
import {map, orderBy} from 'lodash'
import Chart from './Chart'
import {doAnalyze} from '../../service/actions'

const FavIcon = () => <i className="material-icons">favorite</i>
const ComIcon = () => <i className="material-icons">commute</i>
const AssIcon = () => <i className="material-icons">assignment</i>
const BokIcon = () => <i className="material-icons">book</i>

const ExameFinal = ({DATE, EXAME, SELECTED, HANDLE}) => {
  const {handleChange, handleChangeOne} = HANDLE
  const [RESULTADO, setResultado] = React.useState({})
  const [CONTENT, setContent] = React.useState({})
  const [LOADED, setLoaded] = React.useState(false)
  const FILTER = {
    DATE,
    EXAME: EXAME,
    FILME: SELECTED.FILME,
    LINHA: SELECTED.LINHA
  }
  React.useEffect(() => {
    if(!LOADED) {
      doAnalyze(FILTER, (result) => {
        if(!result.resume) {
          setResultado([])
          setContent([])
        } else {
          let items = orderBy(result.items, ['DATE', 'ITEM'])
          setResultado(result.resume)
          setContent(items)
        }
        setLoaded(true)
      })
    }
  }, [LOADED])
  // }, [UPDATED, forceUpdate])
  if(!RESULTADO || !RESULTADO.specs) return false
  const Resultado = () => {
    const ItemFilmes = () => <li className="FILME" onClick={() => handleChange(RESULTADO.specs.FILME, "FILME")}><AssIcon /> {RESULTADO.specs.FILME}</li>
    const ItemLinhas = () => <li className="LINHA" onClick={() => handleChange(RESULTADO.specs.LINHA, "LINHA")}><AssIcon /> {RESULTADO.specs.LINHA}</li>
    const ItemExames = () => <li className="EXAME" onClick={() => handleChange(RESULTADO.specs.EXAME, "EXAME")}><AssIcon /> {RESULTADO.specs.EXAME}</li>
    const Resultado = () => {
      // if(!RESULTADO || !RESULTADO.desvios) return false
      const {specs, desvios, cpcpk} = RESULTADO
      return (
        <>
          <li>Len: {desvios && desvios.TOTAL_ITEMS}</li>
          <li>Alv: {specs && specs.ALVO}</li>
          <li>Min: {specs && specs.MIN}</li>
          <li>Max: {specs && specs.MAX}</li>
          <li>Méd: {desvios && desvios.MEDIA_GERAL}</li>
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
  const Lines = ({CONTENT}) => map(CONTENT, (ITEM) => {
    return (
      <div className='line'>
        <li>{ITEM.EXAME}</li>
        <li>{ITEM.LINHA}</li>
        <li>{ITEM.FILME}</li>
        <li>{ITEM.MIN}</li>
        <li>{ITEM.MAX}</li>
        <li>{ITEM.MEDIA}</li>
        <li>{ITEM.DP}</li>
        <li>{ITEM.ITEM}</li>
        <li>{ITEM.MR}</li>
        <li>{ITEM.DATA}</li>
        <li>{ITEM.X1}</li>
        <li>{ITEM.X2}</li>
        <li>{ITEM.X3}</li>
        <li>{ITEM.X4}</li>
        <li>{ITEM.X5}</li>
      </div>
    )
  })
  return (
    <React.Fragment>
      <div className='GroupExameFinal'>
        <h3>{RESULTADO.specs.EXAME}</h3>
        <div className='Card'>
          <div>
            <Resultado />
          </div>
          <div className='ChartDivisor'>
            <Chart CONTENT={CONTENT} RESUME={RESULTADO} />
          </div>
          <div className='TableCpto'>
            <div className='scrollable'>
              <div className='line header'>
                <li>EXAME</li>
                <li>LINHA</li>
                <li>FILME</li>
                <li>MIN</li>
                <li>MAX</li>
                <li>MEDIA</li>
                <li>DP</li>
                <li>ITEM</li>
                <li>MR</li>
                <li>DATA</li>
                <li>X1</li>
                <li>X2</li>
                <li>X3</li>
                <li>X4</li>
                <li>X5</li>
              </div>
              <Lines CONTENT={CONTENT} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ExameFinal