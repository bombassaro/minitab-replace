import axios from 'axios'
import {map} from 'lodash'
import {loadPacotes} from '../../service/actions'
export default () => {
  const [selectedFile, setSelectedFile] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [isLoaded, setLoaded] = React.useState(false)
  const [PACOTES, setPacotes] = React.useState([])
  React.useEffect(() => {
    if(!isLoaded) {
      loadPacotes((result) => {
        setPacotes(result)
        setLoaded(true)
        setLoading(false)
      })
    }
  }, [isLoaded])
  const handleUpload = ({target}) => {
    if(target.files.length < 1) return false
    setSelectedFile(target.files[0])
  }
  const handleClick = () => {
    const data = new FormData()
    data.append('file', selectedFile)
    // const file = selectedFile
    // console.log(`selectedFile`, file)
    setLoading(true)
    axios.post('/api/pacote/upload', data)
      .then((response) => {
        console.log(`response`, response)
        setLoaded(false)
      })
      .catch((error) => {
        console.log(`error`, error)
      })
    // importPacote(data, (result) => {
      // console.log(`importar.pacote.result`, result)
      // console.log(event.target.files[0])
    // })
  }
  const PacoteItems = () => map(PACOTES, (ITEM) => {
    return (
      <React.Fragment>
        <li>{ITEM.createdAt} / {ITEM.ARQUIVO}</li>
      </React.Fragment>
    )
  })
  return (
    <div className="PageImport">
      <div className='FieldSearch Importar'>
        <h3>IMPORTAR</h3>
      </div>
      <p className="Label">Selecionar arquivo</p>
      <input type="file" onChange={handleUpload} />
      <div onClick={() => handleClick()}>ENVIAR</div>
      {loading ? <p className="Warning">Carregando...</p> : ``}
      <br />
      <br />
      <br />
      <div className='FieldSearch Importar'>
        <h3>PACOTES</h3>
      </div>
      <div className="PacoteFilters">
        <PacoteItems />
      </div>
    </div>
  )
}