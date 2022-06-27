import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Container } from './styles';
import { useForm } from 'react-hook-form';
import api from "../../services/api";
// import edit from './edit.png'

export default function ForChangeModal({tec, setChangeTecs}) {

  const {register, handleSubmit} = useForm()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const userToken = JSON.parse(localStorage.getItem('@Kenziehub:token'))
  const userId = JSON.parse(localStorage.getItem('@Kenziehub:user'))
  


  const getUser = () => {

    api.get(`/users/${userId.id}`).then((res) => {
      localStorage.setItem('@Kenziehub:user', JSON.stringify(res.data))
      setChangeTecs(res.data.techs)
      
      
    })
    
    handleClose()

  }

  const onSubmitFunction = (data) => {

    api.put(`/users/techs/${tec.id}`, data, {
      headers: {Authorization: `Bearer ${userToken}`}
    })
    .then((res) => {
      getUser()
    }).catch((err) => console.log(err))
  
  }

  const deleteFunction = () => {

    api.delete(`/users/techs/${tec.id}`, {
      headers: {Authorization: `Bearer ${userToken}`}
    })
    .then((res) => {
      getUser()
    }).catch((err) => console.log(err))
    
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <div>
            <h5>Tecnologia Detalhes</h5>
          </div>
          <div className='div-contain'>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <h6>Nome do projeto</h6>
              <input type="text" disabled value={tec.title} />
              <h6>Status</h6>
              <input list='status' placeholder={tec.status} {...register('status')}/>
              <datalist id="status" >
                <option value='Iniciante'  />
                <option value='Intermediário' />
                <option value='Avançado' />
              </datalist>
              <div>
                <button type="submit">Salvar alterações</button>
                <button onClick={deleteFunction} type='button' className='grey-button' >Excluir</button>
              </div>
            </form>
          </div>
        </Container>
      </Modal>
    </>
  );
}