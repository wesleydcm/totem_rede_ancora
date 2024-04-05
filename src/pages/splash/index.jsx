import Splash from '../../assets/img/splash.png';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link to={'/home'}>
        <img src={Splash} alt="Imagem principal"/>
      </Link>
    </>
  );
}
