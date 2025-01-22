import { useLocale, useToast } from "@/hooks";
import { Coordinate } from "./types";
import { geocoding } from "./geocoding";
import { useEffect, useState } from "react";
import { DropdownItem } from "@/components/ui/dropdown";


export function useAddressFromCoords(coords: Coordinate) {
  const { locale } = useLocale();
  const toast = useToast();

  const [data, setData] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    geocoding.getAddressFromCoords(coords, locale)
      .then((data) => setData(data))
      .catch((error) => {
        toast.show(String(error.message || error), 'error');
      })
      .finally(() => setLoading(false));
  }, [])

  return {
    data,
    loading,
  };
}