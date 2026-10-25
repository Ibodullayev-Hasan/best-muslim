import { useEffect, useState } from 'react';
import { DataName, DataOf, getData } from '../services/dataService';

export function useData<K extends DataName>(name: K) {
  const [data, setData] = useState<DataOf<K> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    getData(name)
      .then((d) => active && setData(d))
      .catch((e) => active && setError(e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [name]);

  return { data, loading, error };
}