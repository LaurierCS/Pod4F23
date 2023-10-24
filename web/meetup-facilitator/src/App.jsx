import './App.css'
import Button from './components/Button'
import { useRef, useState } from 'react'

function App() {

  const buttonStyles = 'bg-green-700'
  const groupName = useRef('')
  const [validate, setValidate] = useState(false);

  const updateGroupName = (e) => {
    groupName.current = e.target.value;
    console.log(groupName.current);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitting " + groupName.current);
    setValidate(true);
  }

  const validateInput = (e) => {
    console.log('validating input');
  }


  return (
    <>
      <div className='flex-col flex my-6 gap-1'>
        <label className='text-2xl' htmlFor='new-group-name'>Group Name:</label>
        <input ref={groupName} onChange={updateGroupName} className='border-2 p-2' name='new-group-name' id='new-group-name' type='text' placeholder='Enter the group name here.'/>
      </div>
      <Button click={onSubmit} classList={buttonStyles} text='Create Group' onChange={(validate) ? validateInput : undefined}/>
    </>
  )
}

export default App
