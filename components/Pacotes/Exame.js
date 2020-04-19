import React from 'react'
import {filter, map, orderBy} from 'lodash'
import Chart from './Chart'

const FavIcon = () => <i className="material-icons">favorite</i>
const ComIcon = () => <i className="material-icons">commute</i>
const AssIcon = () => <i className="material-icons">assignment</i>
const BokIcon = () => <i className="material-icons">book</i>

const ExameFinal = ({RESULT, SELECTED, HANDLE}) => {
  //DATE, EXAME, SELECTED, 
  const {handleChange, handleChangeOne} = HANDLE
  // const [RESULTADO, setResultado] = React.useState({})
  // const [CONTENT, setContent] = React.useState({})
  // const [LOADED, setLoaded] = React.useState(false)
  const [showTable, setShowTable] = React.useState(false)
  if(!RESULT || !RESULT.items || RESULT.items.length === 0) return false
  let RESULTADO = RESULT.resume
  let CONTENT = orderBy(RESULT.items, ['DATE', 'ITEM'])

  // const FILTER = {
  //   DATE,
  //   EXAME: EXAME,
  //   FILME: SELECTED.FILME,
  //   LINHA: SELECTED.LINHA
  // }
  // React.useEffect(() => {
    // if(!LOADED) {
      // doAnalyze(FILTER, (result) => {
        // if(!result.resume) {
          // setResultado([])
          // setContent([])
        // } else {
          // let items = orderBy(result.items, ['DATE', 'ITEM'])
          // setResultado(result.resume)
          // setContent(items)
        // }
        // setLoaded(true)
      // })
    // }
  // }, [LOADED])
  // }, [UPDATED, forceUpdate])
  if(!RESULTADO || !RESULTADO.specs) return false
  const {specs, desvios, cpcpk} = RESULTADO
  const {OUTLIERS} = desvios
  const Resultado = () => {
    const ItemFilmes = () => <li className="FILME" onClick={() => handleChange(RESULTADO.specs.FILME, "FILME")}><BokIcon /> {RESULTADO.specs.FILME}</li>
    const ItemLinhas = () => <li className="LINHA" onClick={() => handleChange(SELECTED.LINHA[0], "LINHA")}><ComIcon /> {SELECTED.LINHA[0]}</li>
    const ItemExames = () => <li className="EXAME" onClick={() => handleChange(RESULTADO.specs.EXAME, "EXAME")}><AssIcon /> {RESULTADO.specs.EXAME}</li>
    const Resultado = () => {
      // if(!RESULTADO || !RESULTADO.desvios) return false
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
  const Lines = () => map(CONTENT, (ITEM) => {
    let isOutlier = filter(OUTLIERS, {_id: ITEM._id}).length
    // console.log(OUTLIERS.length, {_id: ITEM._id}, isOutlier.length)
    return (
      <div className={`line ${isOutlier ? `red` : ``}`}>
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
        <h3>{RESULTADO.specs.EXAME} <span onClick={() => setShowTable(!showTable)}>{showTable ? `esconder tabela` : `ver tabela`}</span></h3>
        <div className='Card'>
          <div>
            <Resultado />
          </div>
          <div className='ChartDivisor'>
            <Chart CONTENT={CONTENT} RESUME={RESULTADO} />
          </div>
        </div>
        {showTable && (
          <div className='TableCpto TableExame'>
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
              <Lines />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
export default ExameFinal