import "../Css/AboutUs.css";
import Logo from "../assets/Logo.png";

function AboutUs() {
  return (
    <div id="aboutUs" className="AboutUs">
      <div className="AboutUs-container">
        <div className="AboutUs__image">
          <img src={Logo} alt="" />
          <div className="AboutUs__image-overlay"></div>
        </div>
        <div className="AboutUs-content">
          <div className="AboutUs-content-info">
            <h1>World Movies</h1>
            <p>
              Através da integração com a API Movie DB, conseguimos oferecer a
              você informações atualizadas sobre os filmes, incluindo sinopses
              envolventes, elenco e equipe de produção, classificações, datas de
              lançamento e muito mais. Essas informações detalhadas são
              organizadas de maneira intuitiva e fácil de usar, permitindo que
              você encontre rapidamente o que procura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
