import { useEffect } from "react"



const usePoopupClose = (ref, setRef) => {
 
   useEffect( () => {
    document.addEventListener('mousedown', function(e) {
      if(!ref.current.contains(e.target) && ref.current){
        setRef(false)
      }
    })
   }, [ref])

}

export default usePoopupClose;


// useEffect(() => {
//     document.addEventListener('mousedown', function(e) {
//         if(!ref.current.contains(e.target) && ref.current){
//           setRef(false)
//         }
// }, [ref])