import './App.css'
import Button from './components/Button'
import { useRef, useState } from 'react'
import GoogleAuth from './features/GoogleAuth'

function App() {

  const buttonStyles = 'bg-green-700'
  const groupName = useRef('')
  const [isValid, setIsValid] = useState(true);


  const updateGroupName = (e) => {
    groupName.current = e.target.value;
    console.log(groupName.current);
  }

  const onChange = (e) => {
    updateGroupName(e);
    validateInput();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitting " + groupName.current);

    // Validate once on submit
    validateInput();

    // if isValid -> make API call

  }

  const validateInput = () => {
    console.log('validating input: ' + groupName.current);

    if (groupName.current === '')
        setIsValid(false);

    else
      setIsValid(true);
  }


  return (
    <>
      <GoogleAuth />
      <div className='flex-col flex my-3 gap-1'>
        <label className='text-2xl' htmlFor='new-group-name'>Group Name:</label>
        <input ref={groupName} onChange={onChange} className={`border-2 p-2 ${(isValid ? '' : 'border-red-500')} focus:outline-none`} name='new-group-name' id='new-group-name' type='text' placeholder='Enter the group name here.'/>
        <div className={`text-red-500${(isValid) ? ' invisible' : ' visible'}`}>Please enter a valid group name.</div>
      </div>
      <Button click={onSubmit} classList={buttonStyles} text='Create Group' />
    </>
  )
}

export default App