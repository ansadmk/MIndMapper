'use client';

import Modal from 'react-bootstrap/Modal';  
import { ProfileStats, changeProfileStats} from '@/app/redux/slice';
import { useDispatch, useSelector } from 'react-redux';


const Profile = () => {
    const profilestats=useSelector(ProfileStats)
    const dispatch=useDispatch()
    
    const handle = () => dispatch(changeProfileStats());
   
    return (
      <div className='d-flex'>
  
        <Modal show={profilestats} onHide={handle} className='d-flex align-items-center m-4 '>
          <Modal.Header closeButton className='border-0 p-4'>
            <Modal.Title>register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          
        </Modal>
      </div>
    );
}
export default Profile