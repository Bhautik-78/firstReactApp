import React, {useState} from "react";

const Hooks = () => {
//
//     const initialValue = 0
//     const [count, setCount] = useState(initialValue)
//     console.log(count)
//
//     const incrementFive = () => {
//         for(let i=0; i<5; i++){
//             setCount(prevCount => prevCount +1)
//         }
//     }
//     return(
//         <div>
//             Count = {count}<br /><br />
//             <button onClick={() => setCount(initialValue)}>Reset</button>
//             <button onClick={() => setCount(prevCount => prevCount +1)}>Increment</button>
//             <button onClick={() => setCount(prevCount => prevCount -1)}>Decrement</button>
//             <button onClick={incrementFive}>Increment 5</button>
//         </div>
//     )
// }

    // const [name, setName] = useState({firstName: '', lastName: ''})
    //
    // return (
    //     <div>
    //         <input type="text" value={name.firstName} onChange={e => setName({...name, firstName: e.target.value})} />
    //         <input type="text" value={name.lastName} onChange={e => setName({...name, lastName: e.target.value})}/>
    //         <h2>Your First Name is - {name.firstName}</h2>
    //         <h2>Your Last Name is - {name.lastName}</h2>
    //         <h2>{JSON.stringify(name)}</h2>
    //     </div>
    // )


    const [items, setItems] = useState([])
    const addItem = () =>{
        setItems( [...items, {
             id: items.length,
            value: Math.floor(Math.random() * 10 ) +1
        }])

    }

    return(
        <div>
            <button onClick={addItem}>Add a Number</button>
            <ul>
                {
                    items.map(item => (
                        <li key={item.id}>{item.value}</li>
                    ))
                }
            </ul>
        </div>
    )
}
export default Hooks;