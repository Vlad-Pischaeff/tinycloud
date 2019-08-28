//-------------------------------------------------------------------

export const FetchData = (point, str, obj, fn) => {
   let url = window.location.href + point;
   var data = { 'dir': str };
   fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data may be `string` or {object}!
      headers: { 'Content-Type': 'application/json' }
   })
   .then(res => res.json())
   .then(response => fn(response, obj))
   .catch(error => console.error(point + ' ERR--:', error));
}

export const FetchSimple = (point, fn) => {
   let url = window.location.href + point;
   fetch(url, {
      method: 'POST', // or 'PUT'
   })
   .then(res => res.json())
   .then(response => fn(response))
   .catch(error => console.error(point + ' ERR--:', error));
}

export const FetchRaw = (point, obj, fn) => {
   let url = window.location.href + point;
   var data = obj;
   fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data may be `string` or {object}!
      headers: { 'Content-Type': 'application/json' }
   })
   .then(res => res.json())
   .then(response => fn(response))
   .catch(error => console.error(point + ' ERR--:', error));
}

export const ReplaceSpace = (str) => {
      return str.replace( /\s/g, "%20" );
   }
   
export const PlaceSpace = (str) => {
      return str.replace( /%20/g, " " );
   }

//export default FetchData ;
