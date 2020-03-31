import './Styles/styles.css'
const Container = (props) => {
  return (
    <div className='MainContainer'>
      {props.children}
    </div>
  )
}
export default Container