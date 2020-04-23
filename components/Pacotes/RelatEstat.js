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
        <li>{resume.cpcpk.CP ? resume.cpcpk.CP.toFixed(4) : `N/D`}</li>
        <li>{resume.cpcpk.CPK ? resume.cpcpk.CPK.toFixed(4) : `N/D`}</li>
        <li>{resume.cpcpk.PP ? resume.cpcpk.PP.toFixed(4) : `N/D`}</li>
        <li>{resume.cpcpk.PPK ? resume.cpcpk.PPK.toFixed(4) : `N/D`}</li>
        <li>{resume.desvios.DESVIO_DENTRO ? resume.desvios.DESVIO_DENTRO.toFixed(4) : `N/D`}</li>
      </div>
    )
  })
  return (
    <div className='GroupExameFinal'>
      <h3>RELATÓRIO ESTATÍSTICO</h3>
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