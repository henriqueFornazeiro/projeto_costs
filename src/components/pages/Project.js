import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/Message'

function Project(){

    const {id} = useParams()
    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(()=>{
        setTimeout(()=> {
            fetch(`http://localhost:5000/projects/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },

            }).then(resp => resp.json())
            .then((data) => {
                setProject(data)                
            })
            .catch(err => console.log)
        },500)
    }, [id])

    function editPost(project){
        //budget validation
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            }).then(resp => resp.json())
            .then((data) => {
                setProject(data) 
                setShowProjectForm(false)   
                setMessage('Sucesso! O projeto foi atualizado!')
                setType('success')         
            })
            .catch(err => console.log)
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            { project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <Message type={type} msg={message}/>
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span>R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total de Utilizado: </span>R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (<Loading/>)}
        </>
    )
}

export default Project