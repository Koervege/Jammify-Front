import axios from 'axios';
import Swal from 'sweetalert2';

export async function signUp(logo) {

  try {
     let value = await Swal.fire({
      title: 'Sign up!',
      iconHtml: `<img src=${logo} style="width:130px;height:130px; alt="Jammify logo">`,
      html:
            `
              <label for="swal-input1">Email</label>
              <input id="swal-input1" class="swal2-input" type="email" required="required"> 
              <label for="swal-input2">Username</label>
              <input id="swal-input2" class="swal2-input">  
              <label for="swal-input3">Password</label>
              <input id="swal-input3" class="swal2-input" type="password">  
            `,
      showDenyButton: true,
      denyButtonText: 'Cancel',
      confirmButtonText: 'Submit',
      preConfirm: () => {
        return {
         username: document.getElementById('swal-input2').value,
         email: document.getElementById('swal-input1').value,
        };
      },
    });
    if(value) {
      return value.value;
    };
  } catch {
    return
  }
};

