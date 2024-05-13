"use client";

import { useEffect, useState } from "react";
import useStateSync from "@/app/hooks/useStateSync";

export default function TV1() {

    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(0);

    

    function test() {
        //const promise = new Promise((resolve, reject) => setCount(count+1));
        //await setCount(count+1); //3
        setCount(count+1);
        useStateSync(useEffect, [count], () => {
            if(count < 3) {
                setNumber(number+1); //2
            }
        });    
        // promise.then((count) => {
        //     if(count < 3) {
        //         setNumber(number+1); //2
        //     }
        // });
        
    }
    

  return (
    <>
        <div>Count는 {count}</div>
        <div>Number는 {number}</div>
        <div>
            <button onClick={test}>TEST</button>
        </div>
    </>
  )
}