import {map} from 'lodash'

const Relatorio = ({RESULTADO}) => {
  if(RESULTADO.status === false) return false
  const Lines = () => map(RESULTADO, (ITEM) => {
    if(!ITEM) return false
    const {resume} = ITEM
    if(!resume.specs) return false
    const outliers = resume.desvios.PERCT_OUTLIERS ? (resume.desvios.PERCT_OUTLIERS * 100).toFixed(2) : `N/D`
    return (
      <div className='line'>
        <li>{resume.specs.FILME}</li>
        <li>{resume.specs.EXAME}</li>
        <li>{resume.desvios.TOTAL_ITEMS}</li>
        <li>{resume.desvios.OUTLIERS.length}</li>
        <li>{outliers}</li>
        <li>{resume.desvios.MEDIA_GERAL ? Math.abs(resume.desvios.MEDIA_GERAL).toFixed(4) : `N/D`}</li>
        <li>{resume.desvios.LIMITE_MENOR ? Math.abs(resume.desvios.LIMITE_MENOR).toFixed(4) : `N/D`}</li>
        <li>{resume.desvios.LIMITE_MAIOR ? Math.abs(resume.desvios.LIMITE_MAIOR).toFixed(4) : `N/D`}</li>
        <li>{resume.specs.ALVO ? resume.specs.ALVO : `N/D`}</li>
        <li>{resume.specs.MIN ? resume.specs.MIN : `N/D`}</li>
        <li>{resume.specs.MAX ? resume.specs.MAX : `N/D`}</li>
        <li>{resume.desvios.DESVIO_ALVO ? Math.abs(resume.desvios.DESVIO_ALVO).toFixed(4) : `N/D`}</li>
        <li>{resume.desvios.DESVIO_LIE ? Math.abs(resume.desvios.DESVIO_LIE).toFixed(4) : `N/D`}</li>
        <li>{resume.desvios.DESVIO_LSE ? Math.abs(resume.desvios.DESVIO_LSE).toFixed(4) : `N/D`}</li>
      </div>
    )
  })
  return (
    <div className='GroupExameFinal'>
      <h3>ACOMPANHAMENTO DE RESULTADOS</h3>
      <div className='TableCpto TableReport'>
        <div className='scrollable'>
          <div className='line header'>
            <li>PRODUTO</li>
            <li>PARÂMETRO</li>
            <li>N</li>
            <li>OUTL(n)</li>
            <li>OUTL(%)</li>
            <li>X MÉDIO</li>
            <li>LIC</li>
            <li>LSC</li>
            <li>ALVO</li>
            <li>LIE</li>
            <li>LSE</li>
            <li>D.ALVO</li>
            <li>D.LIE</li>
            <li>D.LSE</li>
          </div>
          <Lines />
        </div>
      </div>
    </div>
  )
}
export default Relatorio