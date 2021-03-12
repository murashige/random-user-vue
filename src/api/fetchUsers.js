import axios from 'axios'

export const fetchUsersRequest = params => {
  return axios.get('https://randomuser.me/api', {
    params: params,
  })
}
