import savings from '../../img/savings.svg'
import LinkButton from '../layouts/LinkButton'
import style from './Home.module.css'


function Home(){
    
    return (
        <section className={style.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar projeto"/>
            <img src={savings} alt="Costs"/>
        </section>
    )

}

export default Home