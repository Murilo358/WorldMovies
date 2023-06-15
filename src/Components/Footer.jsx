import Logo from "../assets/Logo.png";
import "../Css/Footer.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div>
      {" "}
      <footer className="footer flex-center">
        <div className="footer__logo">
          <a href="/">
            {" "}
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="footer__madeBy">
          <h5>Desenvolvido por Murilo Barbosa</h5>
        </div>
        <div className="footer__social">
          <a href="https://www.linkedin.com/in/murilo-barbosa-da-cunha-6297ba1b6/">
            <BsLinkedin className="footer-icon" />
          </a>

          <a href="https://github.com/Murilo358">
            <BsGithub className="footer-icon" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
