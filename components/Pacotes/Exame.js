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
    const ItemFilmes = () => {
      return (
        <li className="FILME">
          <span className="label">FILME</span>
           {/* // <BokIcon />  */}
          <span className="value">{RESULTADO.specs.FILME}</span>
        </li>
      )
    }
    const ItemLinhas = () => {
      return (
        <li className="LINHA">
          <span className="label">LINHA</span>
           {/* // <ComIcon />  */}
          <span className="value">{SELECTED.LINHA[0]}</span>
        </li>
      )
    }
    const ItemExames = () => {
      return (
        <li className="EXAME">
          <span className="label">EXAME</span>
           {/* // <AssIcon />  */}
          <span className="value">{RESULTADO.specs.EXAME}</span>
        </li>
      )
    }
    const Resultado = () => {
      // if(!RESULTADO || !RESULTADO.desvios) return false
      return (
        <>
          <li>
            <span className="label">Len</span>
            <span className="value">{desvios && desvios.TOTAL_ITEMS}</span>
          </li>
          <li>
            <span className="label">Alv</span>
            <span className="value">{specs.ALVO ? specs.ALVO : `N/D`}</span>
          </li>
          <li>
            <span className="label">Min</span>
            <span className="value">{specs.MIN ? specs.MIN : `N/D`}</span>
          </li>
          <li>
            <span className="label">Max</span>
            <span className="value">{specs.MAX ? specs.MAX : `N/D`}</span>
          </li>
          <li>
            <span className="label">Méd</span>
            <span className="value">{desvios.MEDIA_GERAL ? desvios.MEDIA_GERAL.toFixed(4) : `N/D`}</span>
          </li>
          <li>
            <span className="label">DP</span>
            <span className="value">{desvios.DESVIO_PADRAO ? desvios.DESVIO_PADRAO.toFixed(4) : `N/D`}</span>
          </li>
          <li>
            <span className="label">DD</span>
            <span className="value">{desvios.DESVIO_DENTRO ? desvios.DESVIO_DENTRO.toFixed(4) : `N/D`}</span>
          </li>
          <li>
            <span className="label">PP</span>
            <span className="value">{cpcpk.PP ? cpcpk.PP.toFixed(4) : `N/D`}</span>
          </li>
          <li>
            <span className="label">PPK</span>
            <span className="value">{cpcpk.PPK ? cpcpk.PPK.toFixed(4) : `N/D`}</span>
          </li>
          <li>
            <span className="label">CP</span>
            <span className="value">{cpcpk.CP ? cpcpk.CP.toFixed(4) : `N/D`}</span>
          </li>
          <li>
            <span className="label">CPK</span>
            <span className="value">{cpcpk.CPK ? cpcpk.CPK.toFixed(4) : `N/D`}</span>
          </li>
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
      <div className={`line item ${isOutlier ? `red` : ``}`}>
        <li>{ITEM.LINHA}</li>
        <li>{ITEM.EXAME}</li>
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
          <Resultado />
          <div className='ChartDivisor'>
            <Chart CONTENT={CONTENT} RESUME={RESULTADO} />
          </div>
        </div>
        {showTable && (
          <div className='TableCpto TableExame'>
            <div className='scrollable'>
              <div className='line header'>
                <li>LINHA</li>
                <li>EXAME</li>
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