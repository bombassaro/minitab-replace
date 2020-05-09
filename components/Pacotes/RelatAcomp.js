import {map} from 'lodash'
import { ExportToCsv } from 'export-to-csv'

const Relatorio = ({RESULTADO}) => {
  if(RESULTADO.status === false) return false
  const toCSV = []
  const Lines = () => map(RESULTADO, (ITEM) => {
    if(!ITEM) return false
    const {resume} = ITEM
    if(!resume.specs) return false
    const outliers = resume.desvios.PERCT_OUTLIERS ? (resume.desvios.PERCT_OUTLIERS * 100).toFixed(2) : `N/D`
    const r = {
      FILME: resume.specs.FILME,
      EXAME: resume.specs.EXAME,
      N: resume.desvios.TOTAL_ITEMS,
      OUT: resume.desvios.OUTLIERS.length,
      OUT2: outliers,
      XMED: resume.desvios.MEDIA_GERAL ? Math.abs(resume.desvios.MEDIA_GERAL).toFixed(4) : `N/D`,
      LIC: resume.desvios.LIMITE_MENOR ? Math.abs(resume.desvios.LIMITE_MENOR).toFixed(4) : `N/D`,
      LSC: resume.desvios.LIMITE_MAIOR ? Math.abs(resume.desvios.LIMITE_MAIOR).toFixed(4) : `N/D`,
      ALVO: resume.specs.ALVO ? resume.specs.ALVO : `N/D`,
      LIE: resume.specs.MIN ? resume.specs.MIN : `N/D`,
      LSE: resume.specs.MAX ? resume.specs.MAX : `N/D`,
      DALVO: resume.desvios.DESVIO_ALVO ? Math.abs(resume.desvios.DESVIO_ALVO).toFixed(4) : `N/D`,
      DLIE: resume.desvios.DESVIO_LIE ? Math.abs(resume.desvios.DESVIO_LIE).toFixed(4) : `N/D`,
      DLSE: resume.desvios.DESVIO_LSE ? Math.abs(resume.desvios.DESVIO_LSE).toFixed(4) : `N/D`
    }
    toCSV.push(r)
    return (
      <div className='line item'>
        <li>{r.FILME}</li>
        <li>{r.EXAME}</li>
        <li>{r.N}</li>
        <li>{r.OUT}</li>
        <li>{r.OUT2}</li>
        <li>{r.XMED}</li>
        <li>{r.LIC}</li>
        <li>{r.LSC}</li>
        <li>{r.ALVO}</li>
        <li>{r.LIE}</li>
        <li>{r.LSE}</li>
        <li>{r.DALVO}</li>
        <li>{r.DLIE}</li>
        <li>{r.DLSE}</li>
      </div>
    )
  })
  const handleExportCSV = () => {
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'ACOMPANHAMENTO DE RESULTADOS',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    }
    const csvExporter = new ExportToCsv(options)
    csvExporter.generateCsv(toCSV)
  }
  return (
    <div className='GroupExameFinal'>
      <div className='header_line'>
        <h3>ACOMPANHAMENTO DE RESULTADOS</h3>
        <div className="ButtonCalculate" onClick={() => handleExportCSV()}><p>EXPORTAR</p></div>
      </div>
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