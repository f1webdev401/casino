import '../../../assets/css/admin/components/AdminUser.css'
const AdminUser = () => {
  return (
    <section className='adminuser-container'>

      <table className='au-table-container'>
        <tr>
          <th>Username</th>
          <th>Phonenumber</th>
          <th>Credits</th>
          <th>Referral</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>monkey123</td>
          <td>0958928591</td>
          <td>200.00</td>
          <td>012jkn909h</td>
          <td>
            <div>
              <button>Add Credits</button>
              <button>Delete User</button>
            </div>
          </td>
        </tr>
      </table>
    </section>
  )
}

export default AdminUser