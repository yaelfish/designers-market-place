let localLoggedinUser = null;
//   _id: "5e21b63a1c9d44000093752d",
//   userName:"kerryjm2020",
//   fullName:"Kerry James Marshall",
//   isArtist:true,
//   imgUrl:"http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profi..."
// }

if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  loggedInUser: localLoggedinUser,
  users: []
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'CURR_USER':
      return { ...state, loggedInUser: action.user };
    case 'USER_REMOVE':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      };
    case 'SET_USERS':
      return { ...state, users: action.users };
    default:
      return state;
  }
}
