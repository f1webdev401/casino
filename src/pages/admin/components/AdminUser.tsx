import { useEffect, useState } from 'react'
import '../../../assets/css/admin/components/AdminUser.css'
import { db } from '../../../firebase-config'
import { ref , onValue ,update,get,child} from 'firebase/database'

const AdminUser = () => {
  
  const [users,setUsers] = useState<any>([])
  const [creditsToAdd,setCreditsToAdd] = useState<any>('')
  const [targetUser,setTargetUser] = useState<any>('')
  const [successAddCredits,setSuccessAddCredits] = useState<boolean>(false)
  const [user_,setUser_] = useState<any>('')
  const [errorMessage,setErrorMessage] = useState('')
  const AddCreditsBtnHandler = async (e:any) => {
    e.preventDefault()
    if(!creditsToAdd) {
      setErrorMessage("Please Enter Amount")
      return;
    }
    try {
      if(targetUser.referralCode !== "") {
          get(child(ref(db), `users/${targetUser.referralCode}`))
          .then(async (snapshot) => {
            if(snapshot) {
              let user_ref = snapshot.val()
              if(user_ref) {
                console.log(user_ref.ownReferral,'this')
                await update(ref(db,`users/${targetUser.referralCode}`),{
                  credits: parseInt(user_ref.credits) + 50
                })
                await update(ref(db,`users/${targetUser.uid}`),{
                  referralCode: ''
                })
              }
            }else {
              console.log('no data')
            }
          })
         .catch((e) => {
          console.log(e)
         })
      }
      await update(ref(db,`users/${targetUser.uid}`),{
        credits: parseInt(targetUser.credits) + parseInt(creditsToAdd),
        cashins: targetUser.cashins[0] === "null" ? [{
          amount:parseInt(creditsToAdd),
          date: getDate(),
          type:"Gcash",
        }] : [...targetUser.cashins,{amount:parseInt(creditsToAdd),
          date: getDate(),
          type:"Gcash",}]
      })
      
      setSuccessAddCredits(true)
      setTargetUser('')
      console.log('success add credits')
    }catch(e) {
      console.log(e)
    }
  }

  function getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`

  }
  useEffect(() => {
    const usersRef = ref(db,'users')
    onValue(usersRef,(snapshot) => {
      const data = snapshot.val()
      console.log(data)
      let dataKeys :any = Object.keys(data)
      // for(let i = 0; i < dataKeys.length ; i ++) {
      //   console.log(data.dataKeys[i])
      // }
      let usersData : any = []
      if(dataKeys) {
         for(let i = 0; i < dataKeys.length ; i ++) {
          usersData.push({...data[dataKeys[i]],uid:dataKeys[i]})
      }
      setUsers(usersData)
      }
    })
  },[])
  return (
    <section className='adminuser-container'>
      <table className='au-table-container'>
        <thead>
          <tr>
          <th>Username</th>
          <th>Phonenumber</th>
          <th>Credits</th>
          <th>Referral</th>
          <th>Action</th>
          </tr>
        </thead>
        {users && 
        users.map((user:any , index:any) => (
        <tbody key={index}>
          <tr>

        <td>{user.email}</td>
        <td>{user.phonenumber}</td>
        <td>{user.credits}</td>
        <td>{user?.ownReferral.slice(0,10)}...</td>
        <td>
          <div>
            <button onClick={() => {
             setTargetUser(user)
             setUser_(user)
             setCreditsToAdd('')
             setErrorMessage('')
            }}>Add Credits</button>
            <button>Delete User</button>
          </div>
        </td>
          </tr>
      </tbody>
        ))
        }
     
        
      </table>
      {targetUser && 
      <div className="au-add-credits-container">
      <form onSubmit={(e) => AddCreditsBtnHandler(e)} className="au-addcredits-modal">
        {errorMessage && 
        <div className="au-error-message">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="" type="button">
          <i className="fa-solid fa-xmark"></i>
        </button>
        </div>
        }
        <button onClick={() => {
          setUser_('')
          setTargetUser('')}} className="au-close-modal"type="button">
          <i className="fa-solid fa-xmark"></i>
        </button>
          <div className="au-ac-modal-header">
            <h1>Add Credits</h1>
          </div>
          <div className="auac-user-detail">
            <span>email:</span>
            <span>{targetUser.email}</span>
          </div>
          <div className="auac-user-detail">
            <span>phonenumber:</span>
            <span>{targetUser.phonenumber}</span>
          </div>
          <div className="auac-user-detail">
            <span>UID:</span>
            <span>{targetUser.uid}</span>
          </div>
          <div className="auac-input-wrapper">
            <label htmlFor="amount">Credits Amount:</label>
            <input type="text" 
            value={creditsToAdd}
            onChange={(e) => setCreditsToAdd(e.target.value)}
            />
          </div>
          <button className='confirm-add'>Confirm</button>
      </form>
      </div>
      }

      {
        successAddCredits &&
        <div className="au-success-ac">
        <div className="ausac-text">
          <span>Success Adding Credits</span>
        </div>
        <div className="ausac-detail">
          <span>email:</span>
          <span>{user_?.email}</span>
        </div>
        <div className="ausac-detail">
          <span>uid:</span>
          <span>{user_?.uid}</span>
        </div>
        <div className="ausac-detail">
          <span>phonenumber:</span>
          <span>{user_?.phonenumber}</span>
        </div>
        <button onClick={() => setSuccessAddCredits(false)}>Close</button>
      </div>
      }
     
    </section>
  )
}

export default AdminUser