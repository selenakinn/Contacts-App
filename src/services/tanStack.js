import axios from 'axios';

export const getContacts=async(){
    return await axios.get('https://65b36193770d43aba479a2f2.mockapi.io/users')
      .data;
  };
