import { useState } from 'react'
import './App.css'


function App() {
  const [general, setGeneral] = useState({name: 'Alibaba Ma', email: 'Ma.Alibaba@Alibaba.com', phone: '+1 604 521 322'});
  const [education, setEducation] = useState([{id: 0, school: 'New York University', study: 'BSc Computer Science', date: 'Aug 2023', save: false}])
  const [experience, setExperience] = useState([{id: 0, company: 'Google Inc', position: 'Junior Engineer', responsibility:'Deployed several codes', dateFrom:'Aug 2023', dateEnd:'Sep 2025', save:false}])

  // General related functions
  
  function saveGeneral() {
    setGeneral({name: document.querySelector('#name').value, email: document.querySelector('#email').value, 
                phone: document.querySelector('#phone').value});
  }

  // education related functions

  function addEducation(number) {
    const newEducation = [...education, {id: number, school: '', study: '', date: '', save: false}];
    setEducation(newEducation);
  }

  function saveEducation(id) {
    setEducation(education.map(edu=> {
      if(edu.id === id) {
        return {...edu, school: document.querySelector('#school'+id).value, study: document.querySelector('#study'+id).value, 
        date: document.querySelector('#date'+id).value, save: true};
      } else {
        return edu;
      }
    }))
  }

  function deleteEducation(id) {
    setEducation(education.filter(edu=> edu.id !== id))
  }

  function editEducation(id) {
    setEducation(education.map(edu=>{
      if(edu.id === id) {
        return {...edu, save: false};
      } else {
        return edu;
      }

    }))
  }

  // experience related functions

  function saveExperience(experienceId) {
    setExperience(experience.map(exp=> {
      if(exp.id === experienceId) {
        return({...exp, company: document.querySelector('#company'+exp.id).value, position: document.querySelector('#position'+exp.id).value, 
        responsibility: document.querySelector('#responsibility'+exp.id).value, dateFrom: document.querySelector('#dateFrom'+exp.id).value, 
        dateEnd: document.querySelector('#dateEnd'+exp.id).value, save:true})
      } else {
        return exp;
      }
    }))
  }

  function addExperience(number) {
    const newExperience = [...experience, {id: number, company: '', position: '', responsibility:'', dateFrom:'', dateEnd:'', save:false}];
    setExperience(newExperience);
  }

  function editExperience(id) {
    setExperience(experience.map(exp => {
      if(exp.id === id) {
      return {...exp, save: false}
    } else {
      return exp;
    }}))
  }

  function deleteExperience(id) {
    setExperience(experience.filter(exp=> exp.id !== id))
  }



  return (
    <>
    <div className='sidebar'>
    <General onClick={saveGeneral} name={general.name} email={general.email} phone={general.phone}/>
    <Education onClick={saveEducation} addEdu={addEducation} editEdu={editEducation} deleteEdu={deleteEducation} education={education}/>
    <Experience onClick={saveExperience} addExp={addExperience} editExp={editExperience} deleteExp={deleteExperience} experience={experience}/>
    </div>
    <CV general={general} education={education} experience={experience}/>
    </>
  )
}

function CV({name, general, education, experience}) {
  return(
  <div className='cv'>
    <div className='generalcv'>
        <h1>{general.name}</h1>
        <h2>{general.email}</h2>
        <h2>{general.phone}</h2>
    </div>
    <h2 className='title'>Education</h2>
    {education.map(edu=>
      <div className='educationcv' key='edu.id'>
      <div className='school'>
      <h3>{edu.school}</h3>
      <h3>{edu.date}</h3>
      </div>
      <p>{edu.study}</p>
      
      </div>
      )}
    <h2 className='title'>Experience</h2>
    {experience.map(exp=>
      <div key={exp.id} className='experiencecv'>
      <div className='company'>
      <h3>{exp.company}</h3>
      <p>{exp.position}</p>
      <p className='bigtext'>{exp.responsibility}</p>
      </div>
    
      <h3 className='date'>{exp.dateFrom} - {exp.dateEnd}</h3>
      
      </div>
      
      )}
      

    
  </div>
  )
}


function Experience({onClick, addExp, editExp, experience, deleteExp}) {
  const [number, setNumber] = useState(0);

  function addNew(number) {
    addExp(number+1);
    setNumber(number+1);
  }

  return (
    <div className='experience'>
      <h2>Experience</h2>
      <div className='add'>
      <button className='save' type='button' onClick={()=>addNew(number)}>Add More Experience</button>
      </div>
      {experience.map(exp=> 
        exp.save === false?
        <div key={exp.id} className='exp'>
        
        <div className='label'>  
          <label htmlFor={'company'+exp.id}>Company: </label>
          <input id={'company'+exp.id} type='text' defaultValue={exp.company}/>
        </div>
        <div className='label'>
        <label htmlFor={'position'+exp.id}>Position: </label>
        <input id={'position'+exp.id} type='text' defaultValue={exp.position}/>
        </div>
        <div className='label'>
        <label htmlFor={'responsibility'+exp.id}>Responsibility: </label>
        <textarea id={'responsibility'+exp.id} rows='10' type='text' className='biginput' defaultValue={exp.responsibility}/>
        </div>
        <div className='label'>
        <label htmlFor={'dateFrom'+exp.id}>Date From</label>
        <input id={'dateFrom'+exp.id} type='text' defaultValue={exp.dateFrom}/>
        </div>
        <div className='label'>
        <label htmlFor={'dateEnd'+exp.id}>Date End:</label>
        <input id={'dateEnd'+exp.id} type='text' defaultValue={exp.dateEnd}/>
        </div>
        <div className='buttons'>
        {exp.id === 0? null : <button type='button' className='button' onClick={()=>deleteExp(exp.id)}>Delete</button>}
        <button type='button' className='button' onClick={() => onClick(exp.id)}>Save</button> 
        </div>
        </div>

        : 

        <div key={exp.id} className='exp'>
        
        <div className='label'>
          <p>{exp.company}</p>
        </div>
        <div className='label'>
          <p>{exp.position}</p>
        </div>
        <div className='label'>
          <p className='bigtext'>{exp.responsibility}</p>
        </div>
        <div className='label'>
          <p>{exp.dateFrom}</p>
        </div>
        <div className='label'>
          <p>{exp.dateEnd}</p>
        </div>
        <div className='buttons'>
        <button type='button' className='button' onClick={()=>deleteExp(exp.id)}>Delete</button>
        <button type='button' className='button' onClick={()=>editExp(exp.id)}>Edit</button> 
        </div>
        </div>  
        )}
    </div>
  )
}

function Education({onClick, addEdu, deleteEdu, editEdu, education}) {
  const [number, setNumber] = useState(0);
  
  function addNew() {
    addEdu(number+1);
    setNumber(number+1);
  }

  
    return (
      <div className='education'>
        <h2>Education</h2>
        <div className='add'>
      <button className='save' type='button' onClick={()=>addNew(number)}>Add More Education</button>
      </div>
        {education.map(edu=>
          edu.save === false?
          <div className='edu' key={edu.id}>
            <div className='label'>
          <label htmlFor={'school'+edu.id}> School: </label>
          <input id={'school'+edu.id} type='text' defaultValue={edu.school} />
      </div>
      <div className='label'>
      <label htmlFor={'study'+edu.id}> Study: </label>
          <input id={'study'+edu.id} type='text' defaultValue={edu.study} />
      </div>
      <div className='label'>
      <label htmlFor={'date'+edu.id}> Date: </label>
          <input id={'date'+edu.id} type='text' defaultValue={edu.date} />
      </div>
      <div className='buttons'>
      {edu.id === 0? null: <button type='button' className='button' onClick={()=> deleteEdu(edu.id)}>Delete</button>}
      <button type='button' className='button' onClick={()=> onClick(edu.id)}>Save</button>

      </div>
      </div>
      :

    <div className='edu' key={edu.id}>
    <div className='label'>
      <p>{edu.school}</p>
    </div>
    <div className='label'>
      <p>{edu.study}</p>
    </div>
    <div className='label'>
      <p>{edu.date}</p>
    </div>
    <div className='buttons'>
      <button type='button' className='button' onClick={()=> deleteEdu(edu.id)}>Delete</button>
      <button type='button' className='button' onClick={()=> editEdu(edu.id)}>Edit</button>

      </div>
      </div>
        
        )}
  
        </div>
    )
    
    }



function General({onClick, name, email, phone}) {
  const [save, setSave] = useState(false);

function saveData() {
  onClick();
  setSave(true);
}  

function editData() {
  setSave(false);
}

  if(save === false) {
    return (
  
  <div className='general'>
    <h2>General Information</h2>
  <div className='label'>
  <label htmlFor='name'> Full Name: </label>
  <input id='name' type='text' defaultValue={name} />
  </div>
  <div className='label'>
  <label htmlFor='email'> Email: </label>
    <input type='email' id='email' defaultValue={email}/>
  </div>
  <div className='label'>
  <label htmlFor='phone'> Phone: </label>
  <input type='tel' id='phone' defaultValue={phone}/>
  </div>
  <button type='button' className='save' onClick={saveData}>Save</button>

  </div>
)} else if (save === true) {
  return (
<div className='general'>
<h2>General Information</h2>
<div className='label'>
  <p>{name}</p>
  </div>
  <div className='label'>
  <p>{email}</p>
  </div> 
  <div className='label'>
  <p>{phone}</p>
  </div>
  <button className='edit' onClick={editData}>Edit</button>

  </div>

    
  )
}
}

export default App
