import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='app__footer'>
      
      <div>
        <p>
        Siège: 147 rue de l'Université 75338 Paris Cedex 07  
        </p>-
        <p>
       tél: +33(0)1 42 75 90 00
        </p>
      </div>
      <div>
        Copyright-&copy;INRAE
      </div>
      <div>
        <a href='https://www.inrae.fr/mentions-legales'>Mentions légales</a>-
        <a href='https://www.inrae.fr/conditions-generales-dutilisation'>CGU</a>-
        <a href='https://www.inrae.fr/achats'> Achats</a>-
        <a href='https://www.inrae.fr/accessibilite'> Accessibilité : non conforme</a>-
        <a href='https://www.inrae.fr/acces-aux-documents-administratifs'>Accès aux documents administratifs</a>-
        <a href='https://www.inrae.fr/contact'>Contact</a>-
        <a href='https://www.inrae.fr/contact'>Cookies </a>
      </div>
    </div>
  )
}

export default Footer