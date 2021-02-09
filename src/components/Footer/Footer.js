import React from 'react';

import facebook from "../../assets/png/facebook.png";
import instagram from "../../assets/png/instagram.png";
import "./Footer.scss";
export default function Footer() {
    return (
        <div id="footer" className="footer">
            <footer className="mainfooter" role="contentinfo">
                <div className="footer-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4> POSTRES</h4>
                                    <ul className="list-unstyled">
                                        <li><a href="/">Galletas decoradas</a></li>
                                        <li><a href="/">Brownie</a></li>
                                        <li><a href="/">Tortas tematicas</a></li>
                                        <li><a href="/">crumble de manzana</a></li>
                                        <li><a href="/">Marquesa</a></li>
                                        <li><a href="/">Y más!</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>RESUMENES</h4>
                                    <ul className="list-unstyled">
                                        <li><a href="/">Problemáticas y Territorio </a></li>
                                        <li><a href="/">Bioquimica</a></li>
                                        <li><a href="/">Nutricion 1</a></li>
                                        <li><a href="/">Salud Colectiva</a></li>
                                        <li><a href="/">Problemáticas Alimentarias</a></li>
                                        <li><a href="/">Anatomía y Fisiología</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>CONTACTO</h4>
                                    <ul className="list-unstyled">
                                        <li><a href="/">SoDulce!</a></li>
                                        <li><a href="/">Banfield Oeste</a></li>
                                        <li><a href="/">3405-4422</a></li>
                                        <li><a href="/">Lun. a Vie. de 9:30 a 19:00 hs.</a></li>
                                        <li><a href="/">Sáb. de 9:30 a 13:30 hs.</a></li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <h4>REDES SOCIALES</h4>
                                <ul className="social-network social-circle">
                                    <li>
                                        <a href="https://www.facebook.com/sofias.desserts.1" target="_blank" ><img className="image-footer" src={facebook} alt="facebook" /></a>
                                    </li>
                                    <li><a href="https://www.instagram.com/_sodulce/" target="_blank" ><img className="image-footer" src={instagram} alt="instagram" target="_blank" /> </a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 copy">
                                <p className="text-center">&copy; Copyright 2020 - SoDulce.  Todos los derechos reservados.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </footer>
        </div>
    )
}
