import api from 'api/api';
import store from 'store';

api.new('https://evening-citadel-85778.herokuapp.com/');
// api.new('http://10.68.0.45:8000/');

export function login(user, pass) {
  return api.login(user, pass);
}

export function logout() {
 return api.logout();
}

export function getUsers() {
  return api.get('users/users/');
}

export function addNewUser(username, password, cb){
  return api.post('users/', {username:username, password:password}).then(function(){
    api.login(username, password).then(function(){
       cb();
    }).catch(function(err){
      console.log(err);
    });
  }).catch(function(err){
    console.log(err);
  });

}



export function getWhiskey(id){
    return api.get("whiskey/" + id + "/").then(function(resp){
      store.dispatch({
        type: 'GET_WHISKEYITEM',
        whiskeyItem: resp.data,
        comparables: resp.data.comparables,
        tags: resp.data.tags,
        reviews: resp.data.reviews
      })
    })
    
}
export function postNewReview(obj){
  console.log('******ID To Post', obj.whiskey);
    return api.post('review/', obj).then(function(resp){
      getWhiskey(obj.whiskey)
    });
}




export function getTagSearch(str){
  console.log("shoot/?tags=" + str);
    return api.get("shoot/?tags=" + str).then(function(resp){
      store.dispatch({
        type: 'GET_TAGSEARCH',
        tagSearch: resp.data.results,
        itemCount: resp.data.count,
        containerInfo: resp.data.results
      })
        if(resp.data.count >= 12) { 
          store.dispatch({
            type: 'CHANGE_SHOWMOREBUTTON',
            showMoreButton: true
          })} else {
            store.dispatch({
              type: 'CHANGE_SHOWMOREBUTTON',
              showMoreButton: false
            })
          }

      console.log('After the call:', resp.data.results.length);
             console.log("tagCount:", resp.data.count);

    })
}

export function getMore(num, str){
  // console.log("shoot/?tags=" + str);
    return api.get("shoot/?page=" + num + "&tags=" + str).then(function(resp){
      store.dispatch({
        type: 'GET_MORE',
        tagSearch: resp.data.results,
        containerInfo: resp.data.results
      })
      console.log('After the more call:', resp.data.results);
    })
}


export function getGeneralSearch(str){
    return api.get("searchbox/?terms=" + str).then(function(resp){
      store.dispatch({
        type: 'GET_TAGSEARCH',
        tagSearch: resp.data, 
        containerInfo: resp.data
      })
      if(resp.data.length >= 12) { 
          store.dispatch({
            type: 'CHANGE_SHOWMOREBUTTON',
            showMoreButton: true
          })} else {
            store.dispatch({
              type: 'CHANGE_SHOWMOREBUTTON',
              showMoreButton: false
            })
          }
      console.log("tagSearch:", resp.data);
    })
}



export function postSavedSearch(obj){
    return api.post('tagsearch/', obj);
}

export function changeFavorite(obj){
  return api.put('changeliked/', obj).then(function(resp){
    getLikes(); 
  });
}

export function getMyLikes() {
  return api.get('likedwhiskey/').then(function(resp){
    store.dispatch({
      type: 'GET_LIKES',
      likedwhiskey: resp.data.results
    })
    console.log('My Likes:', resp.data.results)
  })
};

export function getLikes() {
  return api.get('likedwhiskey/').then(function(resp){
    store.dispatch({
      type: 'GET_LIKES',
      likedwhiskey: resp.data.results,
      containerInfo: resp.data.results
    })
    console.log('Likes:', resp.data.results.length)
  })
};
export function getSearches() {
  return api.get('usersearches/').then(function(resp){
    store.dispatch({
      type: 'GET_SEARCHES',
      usersearches: resp.data.results
    })
    console.log('Searches:', resp.data)
  })
};

export function getSpecificItem(id){
  return api.get('whiskey/' + id + '/').then(function(resp){
    store.dispatch({
      type: 'GET_ITEM',
      list: resp.data
    })
  })
}

export function getSpecificItem(id){
  return api.get('whiskey/' + id + '/').then(function(resp){
    store.dispatch({
      type: 'GET_ITEM',
      list: resp.data
    })
  })
}