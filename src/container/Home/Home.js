import React from 'react'
import './Home.css'
import { Getjson, PageWrapper } from '../../Wrapper'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='app__home'>
        <main id="main">
            
            <article id="content">

              <Link to={"/Selection"}><h1 style={{color:'var(--secondary-color)'}}>SecuRob</h1></Link>
            
            <p>Une application destinée aux concepteurs de machines agricoles dans le cadre de la sécurisation des machines agricoles</p>
            <p>Télécharger la version desktop  de l'application <a href="#applink" style={{color:'var(--secondary-color)'}}>ici</a> </p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/> 
                <table>
                    <thead>
                        <tr>
                            <th>Version</th>
                            <th>fichiers</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.0</td>
                            <td>
                                <a id="applink" href="#"><i className='fa fa-download'  style={{color:'var(--secondary-color)'}}></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </article>
            
        </main>
    </div>
  )
}

export default PageWrapper(Home,'Home','section')
