import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/auth';

export function Header () {

  const auth = useSelector(selectAuth);
  

  
  return (
        <div className="Header">
        <img src='logo.png' style={{width: "25px"}}/>
        {!auth ?(
          <div className='usersImageHeader'>
          <input type='text' className='inputSearch' placeholder='Поиск...'>
          </input>
            <Link to={'/login'}><div className="signin" style={{textDecoration: 'none'}}>Войти</div></Link>
            <Link to={"/register"}><div className="login">Зарегистрироваться</div></Link> 
          </div>
        ) : (
            <div className='usersImageHeader'>
            <input type='text' className='inputSearch' placeholder='Поиск...'>
            </input>
              <Link to={'/profile'}><div className="signin" style={{textDecoration: 'none'}}>Профиль</div></Link>
              <Link to={"/basket"}><div className="login">Корзина</div></Link> 
            </div>
        )
        }
      </div>
    )
}