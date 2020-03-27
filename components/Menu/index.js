const MenuItem = ({path, name}) => <p><a href={path}>{name}</a></p>

export default () => (
  <div className='menu-page'>
    <MenuItem path='/artigos' name='Artigos' />
    <MenuItem path='/projetos' name='Projetos' />
    <MenuItem path='/contato' name='Contato' />
  </div>
)