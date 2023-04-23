import React, { useState } from 'react';
import { cool_50, secondary } from '../themes/main_theme';

const Form = (props) => {
  const [formData, setFormData] = useState(props.initialData || {});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.onSubmit(formData)
  };

  return (
    <form onSubmit={handleSubmit} style={{
      width: "40vw",
      marginTop: "30px"
  }}>
      {props.fields.map(field => (
        <div key={field.name}  style={{
            width: "40vw",
        }}>
          <div htmlFor={field.name} style={{
              width: "100%",
              color: cool_50,
              textAlign: "center"
          }}>{field.label}:</div>
          <div className="input" style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <input type={field.type} name={field.name} id={field.name} placeholder={field.placeholder} value={formData[field.name] || ''} onChange={handleInputChange} style={{
              textAlign: "center",
              width: "80%",
              height: "25px",
              margin: "5px"
            }}/>
          </div>
        </div>
      ))}
      <div className="input" style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "30px"
        }}>
      <button className='submit-button' type="submit" style={{
        width: "70px",
        height: "40px",
        borderRadius: "40px",
        backgroundColor: secondary,
        cursor: "pointer",
      }}
      
      >{props.submitText || 'Submit'}</button>
      </div>
    </form>
  );
};

export default Form;
