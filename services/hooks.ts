import { places } from "./places";
import { geocoding } from "./geocoding";
import { Place } from "@/components/Map";
import { experience } from "./experience";
import { useNavigation } from "expo-router";
import { useLocale, useToast } from "@/hooks";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/providers/AuthProvider";
import { DropdownItem } from "@/components/ui/dropdown";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormPlace } from "@/components/Map/place/modal/useFormPlace";
import { CommentDoc, CommentField, Coordinate, PlaceDoc } from "./types";


type LoadingPlaceList = {
  loading?: boolean;
  refresh?: boolean;
}


export function useAddressFromCoords(coords: Coordinate) {
  const toast = useToast();
  const { locale } = useLocale();

  const [data, setData] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    geocoding.getAddressFromCoords(coords, locale)
      .then((data) => setData(data))
      .catch((error) => toast.show(String(error.message || error), 'error'))
      .finally(() => setLoading(false));
  }, [])

  return {
    data,
    loading,
  };
}





export function useFormPlaceSubmit() {
  const toast = useToast();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (form: FormPlace) => {
    const { image, ...place } = form;
    setLoading(true);
    try {
      let imageRef = '';
      if (image) {
        const response = await places.uploadFile(image)
        imageRef = response.metadata.fullPath;
      }
      return await places.createPlace({
        user: {
          id: auth?.uid || '',
          displayName: auth?.displayName || '',
          photoURL: auth?.photoURL || '',
        },
        ...place,
        imageRef,
      });
    } catch (error: any) {
      toast.show(String(error.message || error), 'error');
    }
    finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    onSubmit,
  }

}





export function useGetPlacesAround(radius: number) {
  const toast = useToast();
  const location = useLocation();

  const [places, setPlaces] = useState<PlaceDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!location) return;
      try {
        const data = await geocoding.getCoordsWithinRadiusDirectly(location.coords, radius);
        setPlaces(data);
      } catch (error: any) {
        toast.show(String(error.message || error), 'error');
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [location, radius])

  return {
    places,
    loading,
    setPlaces,
  }
}



export function useValidationPlace(place: Place) {
  const toast = useToast();

  const [valid, setValid] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const hasPlace = await geocoding.checkIfPlaceExists(place.coordinate);
        setValid(!hasPlace);
      } catch (error: any) {
        toast.show(String(error.message || error), 'error');
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])


  return {
    valid,
    loading,
  }
}






export function useGetPlacesMappedAround(radius: number) {
  const toast = useToast();
  const location = useLocation();
  const navigation = useNavigation();

  const isFocused = navigation.isFocused();

  const [places, setPlaces] = useState<PlaceDoc[]>([]);
  const [loading, setLoading] = useState<LoadingPlaceList>({ loading: true });

  const onFetch = useCallback(async () => {
    if (!location || !isFocused) return;
    try {
      setLoading({ refresh: true });
      const data = await geocoding.getPlacesWithinRadiusDirectly(location.coords, radius);
      setPlaces(data);
    } catch (error: any) {
      toast.show(String(error.message || error), 'error');
    }
    finally {
      setLoading({
        loading: false,
        refresh: false,
      });
    }
  }, [location, radius])

  const fetch = () => {
    onFetch();
  }

  useEffect(() => {
    fetch();
  }, [isFocused, location, radius])

  return {
    places,
    loading,
    onFetch,
  }
}






export function useFormCommentSubmit() {
  const toast = useToast();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (text: string, parentId?: string) => {
    setLoading(true);
    try {
      return await experience.createComment({
        user: {
          id: auth?.uid || '',
          displayName: auth?.displayName || '',
          photoURL: auth?.photoURL || '',
        },
        text,
        parentId: parentId || null,
        parentIdIsNull: !parentId,
      });
    } catch (error: any) {
      toast.show(String(error.message || error), 'error');
    }
    finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    onSubmit,
  }

}





export function useGetRootComments() {
  const toast = useToast();

  const [comments, setComments] = useState<CommentField[]>([]);
  const [loading, setLoading] = useState(false);
  const [canFetch, setCanFetch] = useState(true);
  const lastDoc = useRef<CommentDoc>();

  const isEmtpy = comments.length === 0 && !loading;

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const data = await experience.getRootComments(lastDoc);
      setComments(prev => [...data, ...prev]);
      setCanFetch(data.length > 0);
    } catch (error: any) {
      toast.show(String(error.message || error), 'error');
    }
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMore();
  }, [])

  return {
    loading,
    isEmtpy,
    comments,
    loadMore,
    canFetch,
    setComments,
  }
}










export function useGetChildComments(parentId?: string) {
  const toast = useToast();

  const [comments, setComments] = useState<CommentField[]>([]);
  const [loading, setLoading] = useState(false);
  const lastDoc = useRef<CommentDoc>();

  const loadMore = useCallback(async () => {
    if (!parentId) return;
    setLoading(true);
    try {
      const data = await experience.getComments(parentId, lastDoc);
      setComments(prev => [...data, ...prev]);
    } catch (error: any) {
      toast.show(String(error.message || error), 'error');
    }
    finally {
      setLoading(false);
    }
  }, [parentId]);

  return {
    loading,
    comments,
    loadMore,
    setComments,
  }
}