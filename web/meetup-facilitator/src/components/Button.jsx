function Button(props) {

    const basicButtonStyling = {

        padding: '10px 30px',
        fontSize: '24px',
        color: 'white',
    }


  return (
    <button type='button' onClick={props.click} className={props.classList} style={basicButtonStyling}>{props.text}</button>
  )
}

export default Button