import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../utilities";

export const useApi = (url, method, payload) => {
	const [data, setData] = useState(null);
	const [apiExecution, setApiExecution] = useState(false);
	const [apiState, setApiState] = useState("server request: idle");
	const [error, setError] = useState(null)

	const execute = () => {
		setApiState("server request: idle");
		setApiExecution(true);
	};

	const fetchApi = useCallback(() => {
		console.log("server request: called");

		fetchData(url, method, {...payload})
			.then((res) => {
				const data = res;
                console.log('***data fetched: ', res)
				setData({ ...data });
				return;
			})
			.catch((error) => {
				setData(null);
                setApiState("server request: idle");
                setApiExecution(true);
				setError(error.message)
				console.log(error.message);
			})
			.finally(() => {
                setApiExecution(false);
                setApiState("server request: complete");
			});
	}, [method, payload, url]);

	// call api
	useEffect(() => {
		if (apiExecution && apiState === "server request: idle") {
			setApiState("server request: loading");
			fetchApi();
		}
	}, [apiState, fetchApi, apiExecution]);

	return {
		apiState,
		data,
		error,
		execute,
	};
};
