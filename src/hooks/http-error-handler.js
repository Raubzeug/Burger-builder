import {useState, useEffect} from 'react'


export default axios => {
  const [error, setError] = useState(null);

    const reqInt = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const respInt = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInt);
        axios.interceptors.response.eject(respInt);
      };
    }, [reqInt, respInt, axios.interceptors.request, axios.interceptors.response]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler]
}