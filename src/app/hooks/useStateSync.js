import { useEffect } from "react";

export default function useStateSync(caller, [...p99], callback) {
    caller(callback, [...p99]);
}