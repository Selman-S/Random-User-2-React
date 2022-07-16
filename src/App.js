import React, { useEffect, useState } from 'react'
import mailSvg from './assets/mail.svg'
import manSvg from './assets/man.svg'
import womanSvg from './assets/woman.svg'
import manAgeSvg from './assets/growing-up-man.svg'
import womanAgeSvg from './assets/growing-up-woman.svg'
import mapSvg from './assets/map.svg'
import phoneSvg from './assets/phone.svg'
import padlockSvg from './assets/padlock.svg'
import cwSvg from './assets/cw.svg'
import Footer from './components/footer/Footer'
import axios from 'axios'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [source, setSource] = useState([])
  const [loading, setLoading] = useState(true)
  const [addList, setAddList] = useState([])

  const getUsers = async () => {
    try {
      const { data } = await axios.get(url)
      const { results } = data
      setSource(results)
      setLoading(false)
      handleUser()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])
  console.log(source)

  const handleUser = () => {
    setTitle('My name is')
    const nam = `${source[0].name.title} ${source[0].name.first} ${source[0].name.last}`
    setDesc(nam)
  }

  const addUser = name => {
    let newList = addList
   newList.push(source[0])
   console.log(newList);
   
   

    

    // const newList = addList.push(`<td className="th">${name}</td>`);

    // setAddList(newList)
  }
  
  

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <div className="block bcg-orange">
            <img src={cwSvg} alt="cw" id="cw" />
          </div>
          <div className="block">
            <div className="container">
              <img
                src={source[0].picture.medium}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">{title}</p>
              <p className="user-value">{desc}</p>
              <div className="values-list">
                <button className="icon" data-label="name" onMouseOver={handleUser}>
                  <img
                    src={source[0].gender === 'female' ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                  />
                </button>
                <button
                  className="icon"
                  data-label="email"
                  onMouseOver={() => {
                    setDesc(source[0].email)
                    setTitle('My Email is')
                  }}
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="age"
                  onMouseOver={() => {
                    setDesc(source[0].dob.age)
                    setTitle('My Age is')
                  }}
                >
                  <img src={womanAgeSvg} alt="age" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="street"
                  onMouseOver={() => {
                    const street = `${source[0].location.street.number} ${source[0].location.street.name}`
                    setDesc(street)
                    setTitle('My Street is')
                  }}
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="phone"
                  onMouseOver={() => {
                    setDesc(source[0].phone)
                    setTitle('My Phone is')
                  }}
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="password"
                  onMouseOver={() => {
                    setDesc(source[0].login.password)
                    setTitle('My Password is')
                  }}
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button
                  className="btn"
                  type="button"
                  onClick={() => getUsers()}
                >
                  new user
                </button>
                <button className="btn" type="button" onClick={addUser}>
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="body-tr">
                 
                    <td >Firstname</td>
                <td >Email</td>
                <td >Phone</td>
                <td >Age</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Footer />
          </div>
        </main>
      )}
    </>
  )
}

export default App
