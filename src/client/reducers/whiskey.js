const whiskeyInitialState = {
  whiskeyItem: {},
  comparables: [],
  likes: [],
  tags: [],
  reviews: [],
  searchTag: ""
}

export default function (state = whiskeyInitialState, action) {

  switch (action.type) {
    case 'GET_WHISKEYITEM':
    	return {
    		whiskeyItem: action.whiskeyItem,
    		comparables: action.comparables,
        likes: state.likes,
        tags: action.tags,
        reviews: [...action.reviews],
        searchTag: state.searchTag
    	}

    case 'GET_LIKETAGS':
      return {
          whiskeyItem: state.whiskeyItem,
          comparables: state.comparables,
          likes: action.likes,
          tags: state.tags,
          reviews: state.reviews,
          searchTag: state.searchTag      
      }

      case 'CLEAR_SEARCHTAG':
      return {
          whiskeyItem: state.whiskeyItem,
          comparables: state.comparables,
          likes: state.likes,
          tags: state.tags,
          reviews: state.reviews,
          searchTag: action.searchTag      
      }
     // case 'GET_REVIEWS':
     //  return {
     //      whiskeyItem: state.whiskeyItem,
     //      comparables: state.comparables,
     //      likes: state.likes,
     //      reviews: [...state.reviews, ...action.reviews]
     //  }  

    default:
      return state;
  }
}








