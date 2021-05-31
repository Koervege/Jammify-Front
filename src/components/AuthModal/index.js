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
      preConfirm: async () => {
        
        try {
          const response = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/users/',
            data: {
              email: document.getElementById('swal-input1').value,
              name: document.getElementById('swal-input2').value,
              password: document.getElementById('swal-input3').value,
            },
          });
          console.log(response)
          localStorage.setItem('token', response.data.token)
          return {
            username: document.getElementById('swal-input2').value,
            email: document.getElementById('swal-input1').value,
           };
        } catch(err) {
          await Swal.fire({ icon:'error', title:'Something went wrong. Try again later'})
        }
      },
    });
    if(value) {
      return value.value;
    };
  } catch {
    return;
  };
};

export async function login(logo) {

  try {
    let value = await Swal.fire({
     title: 'Log in to an existing account',
     iconHtml: `<img src=${logo} style="width:130px;height:130px; alt="Jammify logo">`,
     html:
           `
             <label for="swal-input1">Email</label>
             <input id="swal-input1" class="swal2-input" type="email" required="required"> 
             <label for="swal-input3">Password</label>
             <input id="swal-input3" class="swal2-input" type="password" required="required">  
           `,
     showDenyButton: true,
     denyButtonText: 'Cancel',
     confirmButtonText: 'Submit',
     preConfirm: async () => {
       
       try {
         const response = await axios({
           method: 'POST',
           baseURL: process.env.REACT_APP_SERVER_URL,
           url: '/users/log',
           data: {
             email: document.getElementById('swal-input1').value,
             password: document.getElementById('swal-input3').value,
           },
         });
         console.log(response)
         localStorage.setItem('token', response.data.token)
         return {
           username: response.data.username,
           email: document.getElementById('swal-input1').value,
          };
       } catch(err) {
         await Swal.fire({ icon:'error', title:'Something went wrong. Try again later'})
       }
     },
   });
   if(value) {
     return value.value;
   };
 } catch {
   return;
 };
}

