import { useToast } from "@/hooks";
import { Coordinate } from "./types";
import { useEffect, useState } from "react";
import { DropdownItem } from "@/components/ui/dropdown";
import { geocoding } from "./geocoding";


export function useAddressFromCoords(coords: Coordinate) {
  const toast = useToast();

  const [address, setaddress] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    geocoding.getAddressFromCoords(coords)
      .then((data) => setaddress(data))
      .catch((error) => {
        toast.show(String(error.message || error), 'error');
      })
      .finally(() => setLoading(false));
  }, [])

  return { 
    data: address as DropdownItem[],
    loading,
   };
}