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
      CP: resume.cpcpk.CP ? resume.cpcpk.CP.toFixed(4) : `N/D`,
      CPK: resume.cpcpk.CPK ? resume.cpcpk.CPK.toFixed(4) : `N/D`,
      PP: resume.cpcpk.PP ? resume.cpcpk.PP.toFixed(4) : `N/D`,
      PPK: resume.cpcpk.PPK ? resume.cpcpk.PPK.toFixed(4) : `N/D`,
      DPS: resume.desvios.DESVIO_DENTRO ? resume.desvios.DESVIO_DENTRO.toFixed(4) : `N/D`,
      DPL: ``,
      CR: ``
    }
    toCSV.push(r)
    return (
      <div className='line item'>
        <li>{r.FILME}</li>
        <li>{r.EXAME}</li>
        <li>{r.N}</li>
        <li>{r.OUT}</li>
        <li>{r.OUT2}</li>
        <li>{r.CP}</li>
        <li>{r.CPK}</li>
        <li>{r.PP}</li>
        <li>{r.PPK}</li>
        <li>{r.DPS}</li>
        <li></li>
        <li></li>
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
        <h3>RELATÓRIO ESTATÍSTICO</h3>
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
            <li>CP</li>
            <li>CPK</li>
            <li>PP</li>
            <li>PPK</li>
            <li>DPS</li>
            <li>DPL</li>
            <li>CR</li>
          </div>
          <Lines />
        </div>
      </div>
    </div>
  )
}
export default Relatorio